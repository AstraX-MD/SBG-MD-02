export default {
    name: 'clear',
    alias: ['clearchat', 'deletechat'],
    category: 'profile',
    desc: 'Clear the entire chat securely',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ clear: { messages: [{ id: msg.key.id, fromMe: true, timestamp: msg.messageTimestamp }] } }, msg.key.remoteJid);
            reply('✅ Chat cleared locally on the device.');
        } catch (err) {
            reply('❌ Failed to clear messages context.');
        }
    }
};
