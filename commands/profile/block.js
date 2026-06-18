export default {
    name: 'block',
    alias: ['blockuser'],
    category: 'profile',
    desc: 'Block a specific user',
    execute: async ({ sock, msg, args, reply }) => {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message.extendedTextMessage?.contextInfo?.participant;

        const usage = `╭───〔 *BLOCK USAGE* 〕───⊷\n` +
            `│ block tag\n` +
            `│ Tag someone to block\n` +
            `│\n` +
            `│ block reply\n` +
            `│ Reply a Message to block\n` +
            `│\n` +
            `│ block number\n` +
            `│ Use number to block\n` +
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
            await sock.updateBlockStatus(target, 'block');
            reply('✅ User has been blocked successfully.');
        } catch (err) {
            reply('❌ Failed to block user.');
        }
    }
};
