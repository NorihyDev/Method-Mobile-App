function loginPageInit() {
  const form = document.getElementById('login-form');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('login-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ui.clearFormErrors(form);

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const validationResult = validation.validateLoginForm(username, password);
    if (!validationResult.isValid) {
      ui.displayFormErrors(form, validationResult.errors);
      return;
    }

    const originalText = submitBtn.innerHTML;
    ui.showLoading(submitBtn);

    const result = await authManager.login(username, password);

    if (result.success) {
      ui.showToast('Login successful', 'success');
      app.showAppInterface();
    } else {
      ui.hideLoading(submitBtn, originalText);
      ui.showToast(result.error, 'error');
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loginPageInit };
}
