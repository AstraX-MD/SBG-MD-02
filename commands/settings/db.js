export default {
    name: 'db',
    alias: ['database', 'config'],
    category: 'settings',
    desc: 'Shows the current runtime DB settings',
    execute: async ({ settings, reply }) => {
        reply(`*Current Database Settings:*\n\n` +
            `🔹 Prefix: ${settings.prefix}\n` +
            `🔹 Bot Name: ${settings.botName}\n` +
            `🔹 Footer: ${settings.footer}\n` +
            `🔹 Anti-Delete: ${settings.antiDelete ? 'ON' : 'OFF'}\n` +
            `🔹 Channel Forwarding: ${settings.channelForwarding !== false ? 'ON' : 'OFF'}\n` +
            `🔹 Auto-React: ${settings.autoReact ? 'ON' : 'OFF'}\n` +
            `🔹 Auto-View Status: ${settings.autoViewStatus ? 'ON' : 'OFF'}\n` +
            `🔹 Auto-Like Status: ${settings.autoLikeStatus ? 'ON' : 'OFF'}\n` +
            `🔹 Auto-Reply Status: ${settings.autoReplyStatus ? 'ON' : 'OFF'}\n` +
            `🔹 Auto-Reply Text: ${settings.autoReplyContent}\n\n` +
            `All changes are instant. DB Adapter is active.`);
    }
};
