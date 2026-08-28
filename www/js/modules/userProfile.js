const userProfile = {
  profile: null,

  set(data) {
    this.profile = data;
    storage.setUser(data);
  },

  get() {
    return this.profile || storage.getUser();
  },

  update(updates) {
    if (!this.profile) return null;
    
    this.profile = {
      ...this.profile,
      ...updates
    };
    storage.setUser(this.profile);
    return this.profile;
  },

  getDisplayName() {
    if (!this.profile) return 'User';
    return this.profile.username || 'User';
  },

  getAvatarUrl() {
    if (!this.profile) return null;
    return this.profile.avatar;
  },

  clear() {
    this.profile = null;
    storage.clear();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userProfile;
}
