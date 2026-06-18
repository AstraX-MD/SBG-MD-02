export default {
    name: 'pin',
    alias: ['pinchat'],
    category: 'profile',
    desc: 'Pin the current chat',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ pin: true }, msg.key.remoteJid);
            reply('✅ Chat successfully pinned on the device.');
        } catch (err) {
            reply('❌ Failed to pin chat.');
        }
    }
};
