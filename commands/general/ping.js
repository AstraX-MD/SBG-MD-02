export default {
    name: 'ping',
    alias: ['speed'],
    category: 'general',
    desc: 'Check the bot response delay',
    execute: async ({ sock, msg, reply }) => {
        const start = Date.now();
        await sock.sendMessage(msg.key.remoteJid, { text: 'Pinging...' }, { quoted: msg });
        reply(`*Pong!* Speed: ${Date.now() - start}ms`);
    }
};
