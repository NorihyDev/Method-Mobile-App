const api = {
  baseUrl: config.environment === 'production' 
    ? 'https://api.method.app' 
    : 'http://localhost:3000',
  
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = storage.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'An error occurred'
        };
      }

      return data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  },

  auth: {
    register(username, email, password) {
      return api.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword: password })
      });
    },
    login(username, password) {
      return api.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },
    logout() {
      return api.request('/api/auth/logout', {
        method: 'POST'
      });
    },
    me() {
      return api.request('/api/auth/me');
    }
  },

  profile: {
    get() {
      return api.request('/api/profile');
    },
    update(data) {
      return api.request('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },
    uploadAvatar(file) {
      const formData = new FormData();
      formData.append('avatar', file);
      
      return api.request('/api/profile/avatar', {
        method: 'POST',
        body: formData,
        headers: {}
      });
    },
    deleteAvatar() {
      return api.request('/api/profile/avatar', {
        method: 'DELETE'
      });
    }
  },

  messages: {
    getRecent(limit = 50, offset = 0) {
      return api.request(`/api/messages?limit=${limit}&offset=${offset}`);
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}
