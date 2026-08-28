const gamesModule = {
  games: [
    { id: 1, name: 'Game 01', status: 'coming' },
    { id: 2, name: 'Game 02', status: 'coming' },
    { id: 3, name: 'Game 03', status: 'coming' }
  ],

  render() {
    const container = document.getElementById('games-list');
    if (!container) return;

    container.innerHTML = this.games.map((game, index) => `
      <div class="game-card">
        <div class="game-card-header">
          <div class="game-card-icon">${index + 1}</div>
        </div>
        <div class="game-card-body">
          <div class="game-card-title">${game.name}</div>
          <div class="game-card-description">Experience the next generation of gaming</div>
        </div>
        <div class="game-card-footer">
          <span class="game-card-status">Coming Soon</span>
        </div>
      </div>
    `).join('');
  }
};

function gamesPageInit() {
  gamesModule.render();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gamesPageInit, gamesModule };
}
