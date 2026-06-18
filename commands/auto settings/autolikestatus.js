export default {
    name: 'autolikestatus',
    alias: ['statuslike'],
    category: 'auto settings',
    desc: 'Toggle automatic reacting (like) to viewed status',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *AUTOLIKE USAGE* 〕───⊷\n` +
            `│ autolikestatus on\n` +
            `│ Turn auto status likes on\n` +
            `│\n` +
            `│ autolikestatus off\n` +
            `│ Turn auto status likes off\n` +
            `╰─────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ autoLikeStatus: true });
            reply('✅ *Auto-Like Status* is now ENABLED.\n(Requires autoviewstatus to be ON)');
        } else if (state === 'off') {
            await db.updateSettings({ autoLikeStatus: false });
            reply('❌ *Auto-Like Status* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.autoLikeStatus ? 'ON' : 'OFF'}`);
        }
    }
};
