let Client = require('ssh2-sftp-client');
let config = require('./config');

class SFTPClient {
  constructor() {
    this.client = new Client();
  }

  async connect(options) {
    console.log(`Connecting to ${options.host}:${options.port}`);
    try {
      await this.client.connect(options);
    } catch (err) {
      console.log('Failed to connect:', err);
    }
  }

  async disconnect() {
    await this.client.end();
  }

  async listFiles(remoteDir, fileGlob) {
    console.log(`Listing ${remoteDir} ...`);
    let fileObjects;
    try {
      fileObjects = await this.client.list(remoteDir, fileGlob);
    } catch (err) {
      console.log('Listing failed:', err);
    }

    const fileNames = [];

    for (const file of fileObjects) {
      if (file.type === 'd') {
        console.log(
          `${new Date(file.modifyTime).toISOString()} PRE ${file.name}`
        );
      } else {
        console.log(
          `${new Date(file.modifyTime).toISOString()} ${file.size} ${file.name}`
        );
      }

      fileNames.push(file.name);
    }

    return fileNames;
  }

  async uploadFile(localFile, remoteFile) {
    console.log(`Uploading ${localFile} to ${remoteFile} ...`);
    try {
      await this.client.put(localFile, remoteFile);
    } catch (err) {
      console.error('Uploading failed:', err);
    }
  }

  async downloadFile(remoteFile, localFile) {
    console.log(`Downloading ${remoteFile} to ${localFile} ...`);
    try {
      await this.client.get(remoteFile, localFile);
    } catch (err) {
      console.error('Downloading failed:', err);
    }
  }

  async deleteFile(remoteFile) {
    console.log(`Deleting ${remoteFile}`);
    try {
      await this.client.delete(remoteFile);
    } catch (err) {
      console.error('Deleting failed:', err);
    }
  }
}

const upload = async() => {
  const { port, host, username, password } = config;

  //* Open the connection
  const client = new SFTPClient();
  await client.connect({ host, port, username, password });

  const distfolder = process.argv[2];
  const filename = process.argv[3];

  // * 上传文件
  await client.uploadFile(
    `./${distfolder}/${filename}`,
    `./upload/${filename}`,
  );
  console.log('上传成功');
  await client.disconnect();
};

upload();
