export default {
    name: 'archive',
    alias: ['hidechat'],
    category: 'profile',
    desc: 'Archive the current chat',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ archive: true }, msg.key.remoteJid);
            reply('✅ Chat successfully archived on the device.');
        } catch (err) {
            reply('❌ Failed to modify chat archive status.');
        }
    }
};
