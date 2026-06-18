export default {
    name: 'alive',
    alias: ['status', 'botstatus'],
    category: 'general',
    desc: 'Shows the bot uptime and status',
    execute: async ({ settings, reply }) => {
        reply(`*${settings.botName} is ALIVE!*\n\n🚀 System is running perfectly.\n⏳ Uptime: ${Math.floor(process.uptime())}s`);
    }
};
