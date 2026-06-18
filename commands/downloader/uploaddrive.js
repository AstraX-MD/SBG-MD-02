export default {
    name: 'uploaddrive',
    alias: ['sendtodrive', 'gd'],
    category: 'downloader',
    desc: 'Upload a replied file/media to Google Drive',
    execute: async ({ sock, msg, reply, args }) => {
        const usage = `╭───〔 *UPLOAD DRIVE* 〕───⊷\n` +
            `│ uploaddrive reply\n` +
            `│ Reply to an image/video/document\n` +
            `╰─────────────────────⊷`;

        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) return reply(usage);

        const mediaType = Object.keys(quoted)[0];
        const mediaMessage = quoted[mediaType];

        if (!['imageMessage', 'videoMessage', 'documentMessage', 'audioMessage'].includes(mediaType)) {
            return reply('⚠️ Please reply to a valid media or document file!');
        }

        try {
            const { initDrive, uploadBufferToDrive } = await import('../../lib/drive.js');
            
            if (!process.env.GOOGLE_DRIVE_CREDENTIALS_BASE64) {
                return reply('⚠️ Google Drive credentials not configured in environment variables.');
            }
            
            const success = initDrive(process.env.GOOGLE_DRIVE_CREDENTIALS_BASE64);
            if (!success) return reply('❌ Failed to initialize Google Drive.');

            reply('⏳ Downloading media from WhatsApp...');
            
            const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
            const stream = await downloadContentFromMessage(mediaMessage, mediaType.replace('Message', ''));
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
            reply('⏳ Uploading to Google Drive...');
            
            const extensionMap = {
                'imageMessage': 'jpg',
                'videoMessage': 'mp4',
                'documentMessage': 'bin',
                'audioMessage': 'mp3'
            };
            const ext = mediaMessage.fileName ? mediaMessage.fileName.split('.').pop() : extensionMap[mediaType];
            const name = mediaMessage.fileName || `Media_${Date.now()}.${ext}`;

            const result = await uploadBufferToDrive(buffer, name, mediaMessage.mimetype || 'application/octet-stream', folderId);
            reply(`✅ Upload to Google Drive successful!\n\n*Name:* ${result.name}\n*Link:* ${result.webViewLink}`);
        } catch (err) {
            console.error('Upload to Drive error:', err);
            reply('❌ An error occurred during upload.');
        }
    }
};
