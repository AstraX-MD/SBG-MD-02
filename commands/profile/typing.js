export default {
    name: 'typing',
    alias: ['settyping'],
    category: 'profile',
    desc: 'Simulate typing presence in the chat',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.sendPresenceUpdate('composing', msg.key.remoteJid);
            reply('✅ Now showing *typing...* in this chat.');
        } catch (err) {
            reply('❌ Failed to broadcast typing context.');
        }
    }
};
