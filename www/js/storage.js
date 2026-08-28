const storage = {
  TOKEN_KEY: config.auth.tokenKey,
  USER_KEY: config.auth.userKey,

  setToken(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  },

  getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  },

  setUser(user) {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clear() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  },

  setLocalData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  removeLocalData(key) {
    localStorage.removeItem(key);
  },

  clearLocal() {
    localStorage.clear();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = storage;
}
