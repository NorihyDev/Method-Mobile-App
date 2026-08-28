const userProfileModule = {
  user: null,

  async load() {
    try {
      const response = await api.profile.get();
      if (response.data) {
        this.user = response.data;
        this.render();
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  },

  render() {
    if (!this.user) return;

    const avatar = document.getElementById('profile-avatar');
    const username = document.getElementById('profile-username');
    const handle = document.getElementById('profile-handle');
    const joined = document.getElementById('profile-joined');

    if (avatar) {
      if (this.user.avatar) {
        avatar.innerHTML = `<img src="${this.user.avatar}" alt="Avatar">`;
      } else {
        avatar.textContent = this.user.username.charAt(0).toUpperCase();
      }
    }

    if (username) username.textContent = this.user.username;
    if (handle) handle.textContent = `@${this.user.username}`;
    if (joined) {
      const date = new Date(this.user.created_at);
      joined.textContent = date.toLocaleDateString();
    }
  }
};

function profilePageInit() {
  userProfileModule.load();

  const logoutBtn = document.getElementById('logout-btn');
  const editBtn = document.getElementById('edit-profile-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authManager.logout();
      app.showAuthScreens();
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      navigation.setActivePage('edit-profile');
      editProfilePageInit();
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { profilePageInit, userProfileModule };
}
