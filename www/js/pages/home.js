function homePageInit() {
  console.log('Home page initialized');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { homePageInit };
}
