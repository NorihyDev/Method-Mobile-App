function editProfilePageInit() {
  const form = document.getElementById('edit-profile-form');
  const usernameInput = document.getElementById('edit-username');
  const uploadBtn = document.getElementById('upload-avatar-btn');
  const deleteBtn = document.getElementById('delete-avatar-btn');
  const fileInput = document.getElementById('avatar-file');
  const editAvatar = document.getElementById('edit-avatar');

  if (userProfileModule.user) {
    usernameInput.value = userProfileModule.user.username;
  }

  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const originalText = uploadBtn.innerHTML;
    ui.showLoading(uploadBtn);

    try {
      const response = await api.profile.uploadAvatar(file);
      if (response.data) {
        editAvatar.innerHTML = `<img src="${response.data.avatar}" alt="Avatar">`;
        ui.showToast('Avatar updated', 'success');
      }
    } catch (err) {
      ui.showToast('Failed to upload avatar', 'error');
    } finally {
      ui.hideLoading(uploadBtn, originalText);
      fileInput.value = '';
    }
  });

  deleteBtn.addEventListener('click', async () => {
    const originalText = deleteBtn.innerHTML;
    ui.showLoading(deleteBtn);

    try {
      await api.profile.deleteAvatar();
      editAvatar.textContent = userProfileModule.user.username.charAt(0).toUpperCase();
      ui.showToast('Avatar removed', 'success');
    } catch (err) {
      ui.showToast('Failed to remove avatar', 'error');
    } finally {
      ui.hideLoading(deleteBtn, originalText);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    if (!validation.username(username)) {
      ui.showToast('Invalid username', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    ui.showLoading(submitBtn);

    try {
      const response = await api.profile.update({ username });
      if (response.data) {
        userProfileModule.user = response.data;
        userProfileModule.render();
        ui.showToast('Profile updated', 'success');
        showProfilePage();
      }
    } catch (err) {
      ui.showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      ui.hideLoading(submitBtn, originalText);
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { editProfilePageInit };
}
