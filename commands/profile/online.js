export default {
    name: 'online',
    alias: ['setonline', 'active'],
    category: 'profile',
    desc: 'Sets the bot presence to available',
    execute: async ({ sock, reply }) => {
        try {
            await sock.sendPresenceUpdate('available');
            reply('✅ Presence explicitly set to *Online*.');
        } catch (err) {
            reply('❌ Failed to alter presence.');
        }
    }
};
