import { commands } from '../../lib/handler.js';
import sharp from 'sharp';

export default {
    name: 'menu',
    alias: ['help', 'list', 'commands'],
    category: 'general',
    desc: 'Displays the bot menu grouped by categories',
    execute: async ({ sock, msg, settings, prefix }) => {
        const categories = {};
        for (const cmd of commands.values()) {
            const cat = cmd.category || 'uncategorized';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(cmd.name);
        }

        let menuText = `╭───〔 *${(settings.botName || 'SBG Bot').toUpperCase()}* 〕───⊷\n`;
        for (const [cat, cmds] of Object.entries(categories)) {
            menuText += `│\n│ 🔹 *${cat.toUpperCase()}*\n`;
            for (const cmd of cmds) {
                menuText += `│  ${cmd}\n`;
            }
        }
        menuText += `│\n╰────────────────────⊷\n\n_${settings.footer || 'Powered by SBG'}_`;

        let thumbBuffer;
        try {
            const sender = msg.key.participant || msg.key.remoteJid;
            const ppUrl = await sock.profilePictureUrl(sender, 'image');
            const rs = await fetch(ppUrl);
            const buf = Buffer.from(await rs.arrayBuffer());
            thumbBuffer = await sharp(buf).resize(90, 90).toBuffer();
        } catch (e) {
            console.log('Could not fetch PP or resize, relying on default url');
        }

        const contextInfo = settings.channelForwarding ? {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                title: settings.botName || 'SBG Bot',
                body: settings.footer || 'Small But Genius',
                mediaType: 1,
                thumbnailUrl: thumbBuffer ? undefined : 'https://i.ibb.co/0pymBf8T/file-000000002ee471f4a0c0930a2621f19a.png',
                thumbnail: thumbBuffer,
                sourceUrl: 'https://whatsapp.com/channel/0029VbCBgLmCMY0GES5inT3p',
                renderLargerThumbnail: false,
                showAdAttribution: true
            }
        } : {};

        await sock.sendMessage(msg.key.remoteJid, {
            text: menuText,
            contextInfo: Object.keys(contextInfo).length ? contextInfo : undefined
        }, { quoted: msg });
    }
};
