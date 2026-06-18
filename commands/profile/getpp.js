export default {
    name: 'getpp',
    alias: ['getprofilepicture'],
    category: 'profile',
    desc: 'Get profile picture of a user',
    execute: async ({ sock, msg, args, reply }) => {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message.extendedTextMessage?.contextInfo?.participant;

        const usage = `╭───〔 *GETPP USAGE* 〕───⊷\n` +
            `│ getpp tag\n` +
            `│ Tag someone to fetch PP\n` +
            `│\n` +
            `│ getpp reply\n` +
            `│ Reply a Message to fetch PP\n` +
            `│\n` +
            `│ getpp number\n` +
            `│ Use number to fetch PP\n` +
            `╰─────────────────────⊷`;

        let target = '';
        if (mentioned.length > 0) {
            target = mentioned[0];
        } else if (quotedParticipant) {
            target = quotedParticipant;
        } else if (args.length > 0) {
            const num = args[0].replace(/[^0-9]/g, '');
            if (num) target = `${num}@s.whatsapp.net`;
        }

        if (!target) return reply(usage);

        try {
            const ppUrl = await sock.profilePictureUrl(target, 'image');
            await sock.sendMessage(msg.key.remoteJid, { image: { url: ppUrl }, caption: '✅ Here is the requested profile picture.' }, { quoted: msg });
        } catch (err) {
            reply('❌ No profile picture found for this user or it is hidden.');
        }
    }
};
