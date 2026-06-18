export default {
    name: 'setprefix',
    alias: ['changeprefix'],
    category: 'settings',
    desc: 'Change bot prefix inline',
    execute: async ({ args, db, reply }) => {
        const usage = `╭───〔 *SETPREFIX USAGE* 〕───⊷\n` +
            `│ setprefix symbol\n` +
            `│ Provide a symbol like . or !\n` +
            `╰─────────────────────────⊷`;
            
        if (!args[0]) return reply(usage);
        await db.updateSettings({ prefix: args[0] });
        reply(`✅ Prefix updated to: *${args[0]}*`);
    }
};
