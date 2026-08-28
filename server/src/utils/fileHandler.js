const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const AVATAR_DIR = process.env.AVATAR_STORAGE || './uploads';

const ensureUploadDir = () => {
  if (!fs.existsSync(AVATAR_DIR)) {
    fs.mkdirSync(AVATAR_DIR, { recursive: true });
  }
};

const saveAvatar = async (buffer, filename) => {
  ensureUploadDir();
  const ext = path.extname(filename);
  const newFilename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}${ext}`;
  const filepath = path.join(AVATAR_DIR, newFilename);

  await sharp(buffer)
    .resize(512, 512, {
      fit: 'cover',
      position: 'center'
    })
    .toFile(filepath);

  return newFilename;
};

const deleteAvatar = (filename) => {
  if (!filename) return;
  const filepath = path.join(AVATAR_DIR, filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

const getAvatarPath = (filename) => {
  if (!filename) return null;
  return `/uploads/${filename}`;
};

module.exports = {
  saveAvatar,
  deleteAvatar,
  getAvatarPath,
  ensureUploadDir
};
