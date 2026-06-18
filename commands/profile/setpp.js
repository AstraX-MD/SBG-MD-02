export default {
    name: 'setpp',
    alias: ['updatepp', 'changepp'],
    category: 'profile',
    desc: 'Set the bots profile picture',
    execute: async ({ sock, msg, reply }) => {
        const isQuotedImage = msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
        const isImage = msg.message.imageMessage;
        
        const usage = `╭───〔 *SETPP USAGE* 〕───⊷\n` +
            `│ setpp reply\n` +
            `│ Reply an Image to set PP\n` +
            `│\n` +
            `│ setpp image\n` +
            `│ Send image with caption setpp\n` +
            `╰─────────────────────⊷`;

        if (!isQuotedImage && !isImage) return reply(usage);

        try {
            const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
            const mediaObject = isQuotedImage || isImage;
            const stream = await downloadContentFromMessage(mediaObject, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            
            await sock.updateProfilePicture(sock.user.id, buffer);
            reply('✅ Profile picture updated successfully.');
        } catch (err) {
            reply('❌ Failed to update profile picture.');
        }
    }
};
