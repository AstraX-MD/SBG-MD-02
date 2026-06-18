export default {
    name: 'setfooter',
    alias: ['changefooter'],
    category: 'settings',
    desc: 'Change bot footer text everywhere',
    execute: async ({ args, db, reply }) => {
        const usage = `╭───〔 *SETFOOTER USAGE* 〕───⊷\n` +
            `│ setfooter text\n` +
            `│ Provide words for footer texts\n` +
            `╰──────────────────────────⊷`;
            
        if (!args.length) return reply(usage);
        const newFooter = args.join(' ');
        await db.updateSettings({ footer: newFooter });
        reply(`✅ Footer updated to: *${newFooter}*`);
    }
};
