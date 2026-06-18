export default {
    name: 'hidetag',
    alias: ['tagall', 'attention'],
    category: 'group management',
    desc: 'Tags everyone in the group silently',
    execute: async ({ sock, msg, args, reply }) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return reply('⚠️ This command can only be used in groups!');
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const participants = meta.participants.map(p => p.id);
        const tagMsg = args.join(' ') || 'Attention Everyone!';
        sock.sendMessage(msg.key.remoteJid, { text: tagMsg, mentions: participants });
    }
};
