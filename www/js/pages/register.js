function registerPageInit() {
  const form = document.getElementById('register-form');
  const usernameInput = document.getElementById('register-username');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm');
  const submitBtn = document.getElementById('register-submit');

  passwordInput.addEventListener('input', (e) => {
    ui.updatePasswordStrength(e.target.value);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ui.clearFormErrors(form);

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    const validation = validation.validateRegisterForm(username, email, password, confirmPassword);
    if (!validation.isValid) {
      ui.displayFormErrors(form, validation.errors);
      return;
    }

    const originalText = submitBtn.innerHTML;
    ui.showLoading(submitBtn);

    const result = await authManager.register(username, email, password);

    if (result.success) {
      ui.showToast('Account created successfully', 'success');
      setTimeout(() => {
        showLoginScreen();
        form.reset();
      }, 1000);
    } else {
      ui.hideLoading(submitBtn, originalText);
      ui.showToast(result.error, 'error');
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { registerPageInit };
}
