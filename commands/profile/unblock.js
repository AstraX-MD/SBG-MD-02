export default {
    name: 'unblock',
    alias: ['unblockuser'],
    category: 'profile',
    desc: 'Unblock a specific user',
    execute: async ({ sock, msg, args, reply }) => {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message.extendedTextMessage?.contextInfo?.participant;

        const usage = `╭───〔 *UNBLOCK USAGE* 〕───⊷\n` +
            `│ unblock tag\n` +
            `│ Tag someone to unblock\n` +
            `│\n` +
            `│ unblock reply\n` +
            `│ Reply a Message to unblock\n` +
            `│\n` +
            `│ unblock number\n` +
            `│ Use number to unblock\n` +
            `╰───────────────────────⊷`;

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
            await sock.updateBlockStatus(target, 'unblock');
            reply('✅ User has been unblocked successfully.');
        } catch (err) {
            reply('❌ Failed to unblock user.');
        }
    }
};
