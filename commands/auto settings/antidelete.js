export default {
    name: 'antidelete',
    alias: ['toggleantidelete'],
    category: 'auto settings',
    desc: 'Toggle the anti-delete protection loop',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *ANTIDELETE USAGE* 〕───⊷\n` +
            `│ antidelete on\n` +
            `│ Turn protection turned on\n` +
            `│\n` +
            `│ antidelete off\n` +
            `│ Turn protection turned off\n` +
            `╰─────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ antiDelete: true });
            reply('✅ *Anti-Delete* is now ENABLED.');
        } else if (state === 'off') {
            await db.updateSettings({ antiDelete: false });
            reply('❌ *Anti-Delete* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.antiDelete ? 'ON' : 'OFF'}`);
        }
    }
};
