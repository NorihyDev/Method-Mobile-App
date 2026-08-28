const validation = {
  email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  username(username) {
    return username.length >= config.validation.usernameMin &&
           username.length <= config.validation.usernameMax &&
           /^[a-zA-Z0-9_-]+$/.test(username);
  },

  password(password) {
    return password.length >= config.validation.passwordMin &&
           /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password);
  },

  passwordStrength(password) {
    if (password.length < config.validation.passwordMin) return 'weak';
    
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  },

  message(message) {
    return message.trim().length > 0 &&
           message.length <= config.validation.messageMax;
  },

  validateRegisterForm(username, email, password, confirmPassword) {
    const errors = {};

    if (!this.username(username)) {
      errors.username = 'Username must be 3-20 characters, alphanumeric with - or _';
    }

    if (!this.email(email)) {
      errors.email = 'Invalid email address';
    }

    if (!this.password(password)) {
      errors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateLoginForm(username, password) {
    const errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = validation;
}
