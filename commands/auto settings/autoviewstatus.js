export default {
    name: 'autoviewstatus',
    alias: ['statusview'],
    category: 'auto settings',
    desc: 'Toggle automatic viewing of status updates',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *AUTOVIEW USAGE* 〕───⊷\n` +
            `│ autoviewstatus on\n` +
            `│ Turn auto view on\n` +
            `│\n` +
            `│ autoviewstatus off\n` +
            `│ Turn auto view off\n` +
            `╰─────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ autoViewStatus: true });
            reply('✅ *Auto-View Status* is now ENABLED.');
        } else if (state === 'off') {
            await db.updateSettings({ autoViewStatus: false });
            reply('❌ *Auto-View Status* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.autoViewStatus ? 'ON' : 'OFF'}`);
        }
    }
};
