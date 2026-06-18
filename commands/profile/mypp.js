export default {
    name: 'mypp',
    alias: ['myprofile', 'ownpp'],
    category: 'profile',
    desc: 'Get your own profile picture',
    execute: async ({ sock, msg, reply }) => {
        const sender = msg.key.participant || msg.key.remoteJid;
        try {
            const ppUrl = await sock.profilePictureUrl(sender, 'image');
            await sock.sendMessage(msg.key.remoteJid, { image: { url: ppUrl }, caption: '✅ Here is your profile picture.' }, { quoted: msg });
        } catch (err) {
            reply('❌ You don\\'t have a profile picture or it is hidden.');
        }
    }
};
