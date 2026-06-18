export default {
    name: 'vv',
    alias: ['viewonce', 'readviewonce'],
    category: 'downloader',
    desc: 'Retrieve view once media in current chat',
    execute: async ({ sock, msg, reply }) => {
        const usage = `╭───〔 *VV USAGE* 〕───⊷\n` +
            `│ vv reply\n` +
            `│ Reply to a view once media\n` +
            `╰───────────────────⊷`;

        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) return reply(usage);

        const viewOnceMessage = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessage?.message || quoted.viewOnceMessageV2Extension?.message;
        if (!viewOnceMessage) return reply('⚠️ This is not a view once message!');

        const mediaType = Object.keys(viewOnceMessage)[0];
        const mediaMessage = viewOnceMessage[mediaType];

        try {
            const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
            const stream = await downloadContentFromMessage(mediaMessage, mediaType.replace('Message', ''));
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const content = {};
            content[mediaType.replace('Message', '')] = buffer;
            if (mediaMessage.caption) content.caption = mediaMessage.caption;

            await sock.sendMessage(msg.key.remoteJid, content, { quoted: msg });
        } catch (err) {
            reply('❌ Failed to process view once message.');
        }
    }
};
