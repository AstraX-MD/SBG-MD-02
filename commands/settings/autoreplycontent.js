export default {
    name: 'autoreplycontent',
    alias: ['setreplycontent'],
    category: 'settings',
    desc: 'Change the text used when automatically replying to status updates',
    execute: async ({ args, db, reply }) => {
        const usage = `╭───〔 *SETREPLYCONTENT USAGE* 〕───⊷\n` +
            `│ autoreplycontent text\n` +
            `│ Provide words for auto reply\n` +
            `╰──────────────────────────────────⊷`;
            
        if (!args.length) return reply(usage);
        const newReply = args.join(' ');
        await db.updateSettings({ autoReplyContent: newReply });
        reply(`✅ Auto-Reply Content updated to: *${newReply}*`);
    }
};
