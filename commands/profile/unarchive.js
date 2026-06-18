export default {
    name: 'unarchive',
    alias: ['unhidechat', 'showchat'],
    category: 'profile',
    desc: 'Unarchive the current chat',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.chatModify({ archive: false }, msg.key.remoteJid);
            reply('✅ Chat successfully unarchived on the device.');
        } catch (err) {
            reply('❌ Failed to modify chat archive status.');
        }
    }
};
