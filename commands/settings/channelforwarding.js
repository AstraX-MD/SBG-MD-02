export default {
    name: 'channelforwarding',
    alias: ['togglechannel'],
    category: 'settings',
    desc: 'Toggle channel forwarding for bot messages',
    execute: async ({ args, settings, db, reply }) => {
        const usage = `╭───〔 *CHANNEL FORWARDING* 〕───⊷\n` +
            `│ channelforwarding on\n` +
            `│ Enable channel forwarding box\n` +
            `│\n` +
            `│ channelforwarding off\n` +
            `│ Disable channel forwarding box\n` +
            `╰────────────────────────────⊷`;
            
        const state = args[0]?.toLowerCase();
        if (state === 'on') {
            await db.updateSettings({ channelForwarding: true });
            reply('✅ *Channel Forwarding* is now ENABLED.');
        } else if (state === 'off') {
            await db.updateSettings({ channelForwarding: false });
            reply('❌ *Channel Forwarding* is now DISABLED.');
        } else {
            reply(usage + `\n\n*Current State:* ${settings.channelForwarding ? 'ON' : 'OFF'}`);
        }
    }
};
