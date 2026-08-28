const authManager = {
  async register(username, email, password) {
    try {
      const response = await api.auth.register(username, email, password);
      return { success: true, data: response.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.message || 'Registration failed',
        status: err.status 
      };
    }
  },

  async login(username, password) {
    try {
      const response = await api.auth.login(username, password);
      
      if (response.data && response.data.token) {
        storage.setToken(response.data.token);
        storage.setUser(response.data.user);
        
        app.isAuthenticated = true;
        app.user = response.data.user;
        
        return { success: true, data: response.data };
      }
    } catch (err) {
      return { 
        success: false, 
        error: err.message || 'Login failed',
        status: err.status 
      };
    }
  },

  async logout() {
    try {
      await api.auth.logout();
      storage.clear();
      app.isAuthenticated = false;
      app.user = null;
      return { success: true };
    } catch (err) {
      storage.clear();
      app.isAuthenticated = false;
      app.user = null;
      return { success: true };
    }
  },

  async verifySession() {
    try {
      const response = await api.auth.me();
      
      if (response.data) {
        app.isAuthenticated = true;
        app.user = response.data;
        storage.setUser(response.data);
        app.showAppInterface();
        return { success: true };
      }
    } catch (err) {
      storage.clear();
      app.showAuthScreens();
      return { success: false };
    }
  },

  isAuthenticated() {
    return app.isAuthenticated && storage.getToken() !== null;
  },

  getUser() {
    return app.user || storage.getUser();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = authManager;
}
