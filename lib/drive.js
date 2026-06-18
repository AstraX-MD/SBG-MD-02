import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

let driveClient = null;

export const initDrive = (credentialsBase64) => {
    try {
        const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString());
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.file']
        });
        driveClient = google.drive({ version: 'v3', auth });
        console.log('[DRIVE] Google Drive API Initialized');
        return true;
    } catch (e) {
        console.error('[DRIVE] Failed to initialize Google Drive:', e);
        return false;
    }
};

export const uploadToDrive = async (filePath, folderId = null, mimeType = 'application/octet-stream') => {
    if (!driveClient) throw new Error('Drive API not initialized');
    
    const fileName = path.basename(filePath);
    const fileMetadata = { name: fileName };
    if (folderId) fileMetadata.parents = [folderId];
    
    const media = {
        mimeType,
        body: fs.createReadStream(filePath)
    };
    
    const response = await driveClient.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, webContentLink'
    });
    
    return response.data;
};

export const uploadBufferToDrive = async (buffer, fileName, mimeType, folderId = null) => {
    if (!driveClient) throw new Error('Drive API not initialized');
    const { stream } = await import('stream');
    
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const fileMetadata = { name: fileName };
    if (folderId) fileMetadata.parents = [folderId];
    
    const media = {
        mimeType,
        body: bufferStream
    };
    
    const response = await driveClient.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, webContentLink'
    });
    
    return response.data;
};
