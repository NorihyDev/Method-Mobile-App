const gameRenderer = {
  render(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = games.map((game) => `
      <div class="game-card animate-scale-in">
        <div class="game-card-header">
          <div class="game-card-icon">${game.icon}</div>
        </div>
        <div class="game-card-body">
          <div class="game-card-title">${game.name}</div>
          <div class="game-card-description">${game.description}</div>
        </div>
        <div class="game-card-footer">
          <span class="game-card-status">${game.status === 'coming' ? 'Coming Soon' : 'Play Now'}</span>
        </div>
      </div>
    `).join('');
  },

  renderSingle(game) {
    return `
      <div class="game-card animate-scale-in">
        <div class="game-card-header">
          <div class="game-card-icon">${game.icon}</div>
        </div>
        <div class="game-card-body">
          <div class="game-card-title">${game.name}</div>
          <div class="game-card-description">${game.description}</div>
        </div>
        <div class="game-card-footer">
          <span class="game-card-status">${game.status === 'coming' ? 'Coming Soon' : 'Play Now'}</span>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameRenderer;
}
