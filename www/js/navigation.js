const navigation = {
  currentPage: 'home',
  pages: ['home', 'games', 'chat', 'profile', 'edit-profile'],

  setActivePage(pageName) {
    if (!this.pages.includes(pageName)) return;

    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    const page = document.getElementById(`${pageName}-page`);
    if (page) {
      page.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    const navItem = document.querySelector(`[data-page="${pageName}"]`);
    if (navItem) {
      navItem.classList.add('active');
    }

    this.currentPage = pageName;
  },

  getCurrentPage() {
    return this.currentPage;
  }
};

function navigateToPage(pageName) {
  navigation.setActivePage(pageName);
  
  switch(pageName) {
    case 'home':
      homePageInit();
      break;
    case 'games':
      gamesPageInit();
      break;
    case 'chat':
      chatPageInit();
      break;
    case 'profile':
      profilePageInit();
      break;
  }
}

function showLoginScreen() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('register-screen').classList.add('hidden');
}

function showRegisterScreen() {
  document.getElementById('register-screen').classList.remove('hidden');
  document.getElementById('login-screen').classList.add('hidden');
}

function showProfilePage() {
  navigation.setActivePage('profile');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = navigation;
}
