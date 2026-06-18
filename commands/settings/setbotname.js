export default {
    name: 'setbotname',
    alias: ['renamebot'],
    category: 'settings',
    desc: 'Change bot primary name',
    execute: async ({ args, db, reply }) => {
        const usage = `╭───〔 *SETBOTNAME USAGE* 〕───⊷\n` +
            `│ setbotname text\n` +
            `│ Provide words to name the bot\n` +
            `╰──────────────────────────⊷`;
            
        if (!args.length) return reply(usage);
        const newName = args.join(' ');
        await db.updateSettings({ botName: newName });
        reply(`✅ Bot name successfully changed to: *${newName}*`);
    }
};
