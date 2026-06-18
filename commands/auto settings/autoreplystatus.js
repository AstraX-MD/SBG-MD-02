export default {
    name: 'autoreplystatus',
    alias: ['statusreply'],
    category: 'auto settings',
    desc: 'Toggle automatic text reply to viewed status',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *AUTOREPLY USAGE* 〕───⊷\n` +
            `│ autoreplystatus on\n` +
            `│ Turn auto status reply on\n` +
            `│\n` +
            `│ autoreplystatus off\n` +
            `│ Turn auto status reply off\n` +
            `╰─────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ autoReplyStatus: true });
            reply('✅ *Auto-Reply Status* is now ENABLED.\n(Requires autoviewstatus to be ON)');
        } else if (state === 'off') {
            await db.updateSettings({ autoReplyStatus: false });
            reply('❌ *Auto-Reply Status* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.autoReplyStatus ? 'ON' : 'OFF'}`);
        }
    }
};
