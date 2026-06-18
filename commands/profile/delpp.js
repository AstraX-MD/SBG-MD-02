export default {
    name: 'delpp',
    alias: ['removepp', 'deletepp'],
    category: 'profile',
    desc: 'Remove the bots profile picture',
    execute: async ({ sock, msg, reply }) => {
        try {
            await sock.removeProfilePicture(sock.user.id);
            reply('✅ Profile picture removed successfully.');
        } catch (err) {
            reply('❌ Failed to remove profile picture.');
        }
    }
};
