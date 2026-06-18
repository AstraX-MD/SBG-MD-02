export default {
    name: 'offline',
    alias: ['setoffline', 'invisible'],
    category: 'profile',
    desc: 'Sets the bot presence to unavailable',
    execute: async ({ sock, reply }) => {
        try {
            await sock.sendPresenceUpdate('unavailable');
            reply('✅ Presence explicitly set to *Offline*.');
        } catch (err) {
            reply('❌ Failed to alter presence.');
        }
    }
};
