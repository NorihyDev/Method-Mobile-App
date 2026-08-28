const gameData = {
  games: [
    {
      id: 1,
      name: 'Game 01',
      description: 'Experience the next generation of gaming',
      status: 'coming',
      icon: '01'
    },
    {
      id: 2,
      name: 'Game 02',
      description: 'Experience the next generation of gaming',
      status: 'coming',
      icon: '02'
    },
    {
      id: 3,
      name: 'Game 03',
      description: 'Experience the next generation of gaming',
      status: 'coming',
      icon: '03'
    }
  ],

  getAll() {
    return this.games;
  },

  getById(id) {
    return this.games.find(g => g.id === id);
  },

  addGame(gameInfo) {
    const newGame = {
      id: Math.max(...this.games.map(g => g.id)) + 1,
      ...gameInfo
    };
    this.games.push(newGame);
    return newGame;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameData;
}
