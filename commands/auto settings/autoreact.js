export default {
    name: 'autoreact',
    alias: ['toggleautoreact'],
    category: 'auto settings',
    desc: 'Toggle automatic emoji reaction on messages',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *AUTOREACT USAGE* 〕───⊷\n` +
            `│ autoreact on\n` +
            `│ Turn auto react on\n` +
            `│\n` +
            `│ autoreact off\n` +
            `│ Turn auto react off\n` +
            `╰─────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ autoReact: true });
            reply('✅ *Auto-React* is now ENABLED.');
        } else if (state === 'off') {
            await db.updateSettings({ autoReact: false });
            reply('❌ *Auto-React* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.autoReact ? 'ON' : 'OFF'}`);
        }
    }
};
