const ui = {
  showLoading(buttonElement) {
    if (buttonElement) {
      buttonElement.classList.add('btn-loading');
      buttonElement.disabled = true;
      buttonElement.innerHTML = '<span class="spinner"></span> Loading...';
    }
  },

  hideLoading(buttonElement, originalText) {
    if (buttonElement) {
      buttonElement.classList.remove('btn-loading');
      buttonElement.disabled = false;
      buttonElement.innerHTML = originalText;
    }
  },

  showError(element, message) {
    if (element) {
      element.textContent = message;
      element.style.display = 'block';
    }
  },

  hideError(element) {
    if (element) {
      element.textContent = '';
      element.style.display = 'none';
    }
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  clearFormErrors(form) {
    form.querySelectorAll('.auth-input-group').forEach(group => {
      group.classList.remove('error');
      const errorDiv = group.querySelector('.auth-input-error');
      if (errorDiv) errorDiv.textContent = '';
    });
  },

  displayFormErrors(form, errors) {
    this.clearFormErrors(form);
    
    Object.keys(errors).forEach(field => {
      const input = form.querySelector(`#${form.id.replace('-form', '')}-${field}`);
      if (input) {
        const group = input.closest('.auth-input-group');
        if (group) {
          group.classList.add('error');
          const errorDiv = group.querySelector('.auth-input-error');
          if (errorDiv) errorDiv.textContent = errors[field];
        }
      }
    });
  },

  updatePasswordStrength(password) {
    const strength = validation.passwordStrength(password);
    const strengthDiv = document.querySelector('.password-strength');
    
    if (!strengthDiv) return;

    if (password.length === 0) {
      strengthDiv.classList.remove('show');
      return;
    }

    strengthDiv.classList.add('show');
    const indicator = strengthDiv.querySelector('.password-strength-indicator');
    const text = strengthDiv.querySelector('.password-strength-text');

    indicator.className = `password-strength-indicator ${strength}`;
    text.textContent = `Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ui;
}
