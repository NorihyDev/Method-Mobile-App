const config = {
  environment: 'development',
  apiUrl: 'http://localhost:3000',
  socketUrl: 'ws://localhost:3000',
  
  auth: {
    tokenKey: 'method_token',
    userKey: 'method_user'
  },
  
  validation: {
    usernameMin: 3,
    usernameMax: 20,
    passwordMin: 10,
    messageMax: 500
  },

  pages: {
    splash: 'pages/splash.html',
    login: 'pages/login.html',
    register: 'pages/register.html',
    home: 'pages/home.html',
    games: 'pages/games.html',
    chat: 'pages/chat.html',
    profile: 'pages/profile.html',
    editProfile: 'pages/editProfile.html'
  },

  limits: {
    messageLimit: 5,
    messageWindow: 10000
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
