export default {
    name: 'backupdrive',
    alias: ['dbbackup', 'savedb'],
    category: 'downloader',
    desc: 'Backup the current local database to Google Drive',
    execute: async ({ reply, sock, msg }) => {
        try {
            const { initDrive, uploadToDrive } = await import('../../lib/drive.js');
            
            if (!process.env.GOOGLE_DRIVE_CREDENTIALS_BASE64) {
                return reply('⚠️ Google Drive credentials not configured in environment variables (GOOGLE_DRIVE_CREDENTIALS_BASE64).');
            }
            
            const success = initDrive(process.env.GOOGLE_DRIVE_CREDENTIALS_BASE64);
            if (!success) return reply('❌ Failed to initialize Google Drive with provided credentials.');
            
            const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
            reply('⏳ Uploading database backup to Google Drive...');
            
            // backup local database.json (if present)
            const fs = await import('fs');
            if (!fs.existsSync('./database.json')) {
                return reply('❌ No local database.json found to backup.');
            }
            
            const result = await uploadToDrive('./database.json', folderId, 'application/json');
            reply(`✅ Backup successful!\n\n*View File:* ${result.webViewLink}`);
        } catch (err) {
            console.error('Backup error:', err);
            reply('❌ An error occurred during backup.');
        }
    }
};
