export default {
    name: 'reshare',
    alias: ['repost'],
    category: 'profile',
    desc: 'Reshare a quoted media message',
    execute: async ({ sock, msg, reply }) => {
        const usage = `╭───〔 *RESHARE USAGE* 〕───⊷\n` +
            `│ reshare reply\n` +
            `│ Reply to an image/video to repost\n` +
            `╰────────────────────────⊷`;

        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) return reply(usage);

        try {
            await sock.sendMessage(msg.key.remoteJid, { forward: msg.message.extendedTextMessage.contextInfo });
            reply('✅ Media successfully reshared.');
        } catch (err) {
            reply('❌ Failed to reshare message.');
        }
    }
};
