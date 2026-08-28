const app = {
  isAuthenticated: false,
  user: null,
  init() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady() {
    console.log('Device ready, Method App initializing...');
    
    setTimeout(() => {
      if (storage.getToken()) {
        authManager.verifySession();
      } else {
        this.showAuthScreens();
      }
    }, 2000);
  },
  showAuthScreens() {
    const splashScreen = document.getElementById('splash-screen');
    const loginScreen = document.getElementById('login-screen');
    const appMain = document.getElementById('app-main');
    const appNav = document.getElementById('app-nav');

    splashScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    appMain.classList.add('hidden');
    appNav.classList.add('hidden');

    loginPageInit();
  },
  showAppInterface() {
    const splashScreen = document.getElementById('splash-screen');
    const loginScreen = document.getElementById('login-screen');
    const registerScreen = document.getElementById('register-screen');
    const appMain = document.getElementById('app-main');
    const appNav = document.getElementById('app-nav');

    splashScreen.classList.add('hidden');
    loginScreen.classList.add('hidden');
    registerScreen.classList.add('hidden');
    appMain.classList.remove('hidden');
    appNav.classList.remove('hidden');

    navigation.setActivePage('home');
    homePageInit();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = app;
}
