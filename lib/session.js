import fs from 'fs';
import path from 'path';

export const decodeSession = (sessionId, folder = './auth_info_baileys') => {
    if (!sessionId || !sessionId.startsWith('SBG~')) return;
    try {
        const base64Str = sessionId.split('SBG~')[1];
        const credsJson = Buffer.from(base64Str, 'base64').toString('utf-8');
        
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        
        fs.writeFileSync(path.join(folder, 'creds.json'), credsJson);
        console.log('[SESSION] Session ID matched and stored successfully.');
    } catch (err) {
        console.error('[SESSION] Failed to decode Session ID. Ensure it is correct.', err);
    }
};
