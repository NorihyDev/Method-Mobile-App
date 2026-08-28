const profileService = require('../services/profileService');
const { validateProfileUpdate, validateAvatar } = require('../validators/profileValidator');

const getProfile = async (req, res, next) => {
  try {
    const user = await profileService.getUserProfile(req.userId);
    res.status(200).json({
      status: 200,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.body;

    const validation = validateProfileUpdate({ username });
    if (!validation.isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Validation échouée',
        errors: validation.errors
      });
    }

    const result = await profileService.updateUserProfile(req.userId, { username });
    res.status(200).json({
      status: 200,
      message: 'Profil mis à jour',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: 'Fichier requis'
      });
    }

    const validation = validateAvatar(req.file);
    if (!validation.isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Avatar invalide',
        errors: validation.errors
      });
    }

    const result = await profileService.uploadUserAvatar(req.userId, req.file.buffer, req.file.originalname);
    res.status(200).json({
      status: 200,
      message: 'Avatar uploadé',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const deleteAvatar = async (req, res, next) => {
  try {
    await profileService.deleteUserAvatar(req.userId);
    res.status(200).json({
      status: 200,
      message: 'Avatar supprimé'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar
};
