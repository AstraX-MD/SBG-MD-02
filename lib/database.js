import fs from 'fs';
import mongoose from 'mongoose';
import { createClient } from '@supabase/supabase-js';
import admin from 'firebase-admin';

const defaultSettings = {
    prefix: process.env.PREFIX || '!',
    botName: process.env.BOT_NAME || 'SBG Bot',
    footer: process.env.FOOTER || 'Powered by SBG',
    antiDelete: process.env.ANTI_DELETE === 'true' || false,
    channelForwarding: true,
    autoReact: false,
    autoViewStatus: false,
    autoLikeStatus: false,
    autoReplyStatus: false,
    autoReplyContent: 'Nice status!🔥',
};

let dbAdapter = null;

class LocalDB {
    constructor() {
        this.file = './database.json';
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify({ settings: defaultSettings }, null, 2));
        }
    }
    async getSettings() {
        try {
            const data = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
            return { ...defaultSettings, ...data.settings };
        } catch {
            return defaultSettings;
        }
    }
    async updateSettings(updates) {
        let data = { settings: defaultSettings };
        try {
            data = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
        } catch (e) {}
        data.settings = { ...data.settings, ...updates };
        fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
    }
}

class MongoDB {
    constructor(url) {
        mongoose.connect(url)
            .then(() => console.log('[DB] MongoDB Connected'))
            .catch(console.error);
        
        const schema = new mongoose.Schema({
            id: { type: String, default: 'global' },
            settings: { type: Object, default: defaultSettings }
        });
        this.SettingsModel = mongoose.models.Settings || mongoose.model('Settings', schema);
    }
    async getSettings() {
        const doc = await this.SettingsModel.findOne({ id: 'global' });
        return doc ? { ...defaultSettings, ...doc.settings } : defaultSettings;
    }
    async updateSettings(updates) {
        let current = await this.getSettings();
        const merged = { ...current, ...updates };
        await this.SettingsModel.updateOne(
            { id: 'global' },
            { $set: { settings: merged } },
            { upsert: true }
        );
    }
}

class SupabaseDB {
    constructor(url, key) {
        this.supabase = createClient(url, key);
        console.log('[DB] Supabase Initialized');
    }
    async getSettings() {
        const { data, error } = await this.supabase
            .from('bot_settings')
            .select('data')
            .eq('id', 'global')
            .single();
        if (error || !data) return defaultSettings;
        return { ...defaultSettings, ...data.data };
    }
    async updateSettings(updates) {
        const current = await this.getSettings();
        const merged = { ...current, ...updates };
        await this.supabase
            .from('bot_settings')
            .upsert({ id: 'global', data: merged });
    }
}

class SqliteDB {
    constructor(dbPath) {
        this.dbPromise = (async () => {
            const sqlite3 = await import('sqlite3');
            const { open: openSqlite } = await import('sqlite');
            const db = await openSqlite({
                filename: dbPath,
                driver: sqlite3.default.Database || sqlite3.Database
            });
            await db.exec('CREATE TABLE IF NOT EXISTS settings (id TEXT PRIMARY KEY, json_data TEXT)');
            console.log('[DB] SQLite Connected');
            return db;
        })();
    }
    async getSettings() {
        const db = await this.dbPromise;
        const row = await db.get('SELECT json_data FROM settings WHERE id = ?', ['global']);
        if (!row) return defaultSettings;
        try {
            return { ...defaultSettings, ...JSON.parse(row.json_data) };
        } catch {
            return defaultSettings;
        }
    }
    async updateSettings(updates) {
        const current = await this.getSettings();
        const merged = { ...current, ...updates };
        const db = await this.dbPromise;
        await db.run('INSERT OR REPLACE INTO settings (id, json_data) VALUES (?, ?)', ['global', JSON.stringify(merged)]);
    }
}

class FirebaseDB {
    constructor(configBase64) {
        try {
            const serviceAccount = JSON.parse(Buffer.from(configBase64, 'base64').toString());
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            this.db = admin.firestore();
            console.log('[DB] Firebase Firestore Connected');
        } catch(e) {
            console.error('[DB] Firebase Init Error', e);
        }
    }
    async getSettings() {
        if (!this.db) return defaultSettings;
        const doc = await this.db.collection('bot').doc('global').get();
        if (!doc.exists) return defaultSettings;
        return { ...defaultSettings, ...doc.data().settings };
    }
    async updateSettings(updates) {
        if (!this.db) return;
        const current = await this.getSettings();
        const merged = { ...current, ...updates };
        await this.db.collection('bot').doc('global').set({ settings: merged }, { merge: true });
    }
}

export const loadDB = () => {
    if (dbAdapter) return dbAdapter;

    if (process.env.MONGO_URL) {
        console.log('[DB] Auto-detect: MongoDB');
        dbAdapter = new MongoDB(process.env.MONGO_URL);
    } else if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
        console.log('[DB] Auto-detect: Supabase');
        dbAdapter = new SupabaseDB(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    } else if (process.env.FIREBASE_CONFIG_BASE64) {
        console.log('[DB] Auto-detect: Firebase Firestore');
        dbAdapter = new FirebaseDB(process.env.FIREBASE_CONFIG_BASE64);
    } else if (process.env.USE_SQLITE) {
        console.log('[DB] Auto-detect: SQLite');
        dbAdapter = new SqliteDB('./database.sqlite');
    } else {
        console.log('[DB] Auto-detect: Local JSON File');
        dbAdapter = new LocalDB();
    }

    return dbAdapter;
};
