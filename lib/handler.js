import fs from 'fs';
import path from 'path';

export const commands = new Map();
export const aliases = new Map();

export const loadCommands = async (dir = './commands') => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await loadCommands(fullPath);
        } else if (entry.name.endsWith('.js')) {
            const fileUrl = 'file://' + path.resolve(fullPath);
            try {
                const cmdModule = await import(fileUrl);
                if (cmdModule.default && cmdModule.default.name) {
                    commands.set(cmdModule.default.name, cmdModule.default);
                    if (cmdModule.default.alias && Array.isArray(cmdModule.default.alias)) {
                        cmdModule.default.alias.forEach(a => aliases.set(a, cmdModule.default.name));
                    }
                }
            } catch (err) {
                console.error(`Failed to load command ${fullPath}:`, err);
            }
        }
    }
    console.log(`Loaded ${commands.size} commands from file system.`);
};

export const handleMessage = async (sock, msg, db) => {
    if (!msg.message) return;
    if (msg.key.remoteJid === 'status@broadcast') return;

    const settings = typeof db.getSettings === 'function' ? await db.getSettings() : db.settings;
    const prefix = settings?.prefix || process.env.PREFIX || '!';
    
    const text = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || 
                 msg.message.imageMessage?.caption || 
                 msg.message.videoMessage?.caption || '';

    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const cmdStr = aliases.get(commandName) || commandName;
    const command = commands.get(cmdStr);
    
    if (!command) return;

    const reply = (textReply) => {
        sock.sendMessage(msg.key.remoteJid, { 
            text: `${textReply}\n\n_${settings?.footer || 'Powered by SBG'}_` 
        }, { quoted: msg });
    };

    try {
        await command.execute({ sock, msg, text, args, prefix, db, settings, reply });
    } catch (err) {
        console.error(`Error executing ${commandName}:`, err);
        reply('❌ An error occurred while executing that command.');
    }
};
