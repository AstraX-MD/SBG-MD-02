export default {
    name: 'setbio',
    alias: ['changebio', 'updatestatus'],
    category: 'profile',
    desc: 'Updates the bots About bio string',
    execute: async ({ sock, msg, args, reply }) => {
        const usage = `╭───〔 *SETBIO USAGE* 〕───⊷\n` +
            `│ setbio text\n` +
            `│ Provide words to change bio\n` +
            `╰──────────────────────⊷`;

        if (args.length === 0) return reply(usage);

        const newBio = args.join(' ');
        try {
            await sock.updateProfileStatus(newBio);
            reply(`✅ Bio updated to: *${newBio}*`);
        } catch (err) {
            reply('❌ Failed to update bio.');
        }
    }
};
