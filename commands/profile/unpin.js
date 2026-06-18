export default {
    name: 'unpin',
    alias: ['unpinchat'],
    category: 'profile',
    desc: 'Unpin the current chat',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ pin: false }, msg.key.remoteJid);
            reply('✅ Chat successfully unpinned on the device.');
        } catch (err) {
            reply('❌ Failed to unpin chat.');
        }
    }
};
