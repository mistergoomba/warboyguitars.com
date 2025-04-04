// upload-to-ftp.js
require('dotenv').config(); // Load .env variables

const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadDir(client, localDir, remoteDir) {
  await client.ensureDir(remoteDir);
  await client.clearWorkingDir();

  for (const item of fs.readdirSync(localDir)) {
    const fullPath = path.join(localDir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
      await client.uploadFrom(fullPath, path.join(remoteDir, item));
    } else if (stats.isDirectory()) {
      await uploadDir(client, fullPath, path.join(remoteDir, item));
    }
  }
}

(async () => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      secure: false, // or true for FTPS
    });

    const localDirectory = 'out';
    const remoteDirectory = '/warboyguitars.com';

    await uploadDir(client, localDirectory, remoteDirectory);
    console.log('✅ Upload to /warboyguitars.com/ complete!');
  } catch (err) {
    console.error('❌ FTP upload failed:', err);
  }

  client.close();
})();
