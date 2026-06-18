export default {
    name: 'unmute',
    alias: ['unsilence'],
    category: 'profile',
    desc: 'Unmute chat notifications',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ mute: null }, msg.key.remoteJid);
            reply('✅ Chat successfully unmuted.');
        } catch (err) {
            reply('❌ Failed to unmute chat.');
        }
    }
};
