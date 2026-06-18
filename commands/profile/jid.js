export default {
    name: 'jid',
    alias: ['getjid', 'id'],
    category: 'profile',
    desc: 'Retrieve JID of the user, group, or system',
    execute: async ({ msg, args, reply }) => {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message.extendedTextMessage?.contextInfo?.participant;

        if (mentioned.length > 0) {
            return reply(`*JID:* ${mentioned[0]}`);
        } else if (quotedParticipant) {
            return reply(`*JID:* ${quotedParticipant}`);
        } else {
            return reply(`*Chat JID:* ${msg.key.remoteJid}\n*Your JID:* ${msg.key.participant || msg.key.remoteJid}`);
        }
    }
};
