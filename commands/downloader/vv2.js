export default {
    name: 'vv2',
    alias: ['viewonce2'],
    category: 'downloader',
    desc: 'Retrieve view once media and send to your inbox',
    execute: async ({ sock, msg, reply }) => {
        const usage = `╭───〔 *VV2 USAGE* 〕───⊷\n` +
            `│ vv2 reply\n` +
            `│ Reply to a view once media\n` +
            `╰────────────────────⊷`;

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

            const sender = msg.key.participant || msg.key.remoteJid;
            await sock.sendMessage(sender, content);
            if (sender !== msg.key.remoteJid) {
                reply('✅ View once media sent directly to your DMs!');
            }
        } catch (err) {
            reply('❌ Failed to process view once message.');
        }
    }
};
