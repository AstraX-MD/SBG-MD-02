export default {
    name: 'getbio',
    alias: ['fetchbio', 'checkstatus'],
    category: 'profile',
    desc: 'Gets the about bio text of a user',
    execute: async ({ sock, msg, args, reply }) => {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message.extendedTextMessage?.contextInfo?.participant;

        const usage = `╭───〔 *GETBIO USAGE* 〕───⊷\n` +
            `│ getbio tag\n` +
            `│ Tag someone to read Bio\n` +
            `│\n` +
            `│ getbio reply\n` +
            `│ Reply a Message to read Bio\n` +
            `│\n` +
            `│ getbio number\n` +
            `│ Use number to read Bio\n` +
            `╰──────────────────────⊷`;

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
            const status = await sock.fetchStatus(target);
            reply(`*Status / Bio of User:*\n\n📝 ${status.status || 'No status found'}\n🗓️ Set At: ${new Date(status.setAt).toLocaleString()}`);
        } catch (err) {
            reply('❌ Failed to fetch user status / bio. They may have it hidden.');
        }
    }
};
