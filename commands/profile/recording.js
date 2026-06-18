export default {
    name: 'recording',
    alias: ['setrecording'],
    category: 'profile',
    desc: 'Simulate recording audio presence',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.sendPresenceUpdate('recording', msg.key.remoteJid);
            reply('✅ Now showing *recording audio...* in this chat.');
        } catch (err) {
            reply('❌ Failed to broadcast recording context.');
        }
    }
};
