export default {
    name: 'mute',
    alias: ['silence'],
    category: 'profile',
    desc: 'Mute the chat notifications',
    execute: async ({ sock, msg, args, reply }) => {
        const usage = `╭───〔 *MUTE USAGE* 〕───⊷\n` +
            `│ mute 8h\n` +
            `│ Mute for 8 hours\n` +
            `│\n` +
            `│ mute 1w\n` +
            `│ Mute for 1 week\n` +
            `│\n` +
            `│ mute always\n` +
            `│ Mute forever\n` +
            `╰─────────────────────⊷`;

        let duration = args[0]?.toLowerCase();
        let timestamp = 0;
        
        if (duration === '8h') timestamp = 8 * 60 * 60 * 1000;
        else if (duration === '1w') timestamp = 7 * 24 * 60 * 60 * 1000;
        else if (duration === 'always') timestamp = -1;
        else return reply(usage);

        try {
            await sock.chatModify({ mute: timestamp }, msg.key.remoteJid);
            reply(`✅ Chat successfully muted: *${duration}*.`);
        } catch (err) {
            reply('❌ Failed to mute chat.');
        }
    }
};
