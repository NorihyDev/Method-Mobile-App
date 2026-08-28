const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../validators/authValidator');

const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const validation = validateRegister({ username, email, password, confirmPassword });
    if (!validation.isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Validation échouée',
        errors: validation.errors
      });
    }

    const result = await authService.registerUser(username, email, password);
    res.status(201).json({
      status: 201,
      message: 'Compte créé avec succès',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const validation = validateLogin({ username, password });
    if (!validation.isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Données invalides',
        errors: validation.errors
      });
    }

    const result = await authService.loginUser(username, password, req.ip);
    res.status(200).json({
      status: 200,
      message: 'Connexion réussie',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Déconnecté avec succès'
    });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.userId);
    res.status(200).json({
      status: 200,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  me
};
