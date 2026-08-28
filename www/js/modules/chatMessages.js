const chatMessages = {
  messages: [],

  add(message) {
    this.messages.push({
      ...message,
      timestamp: new Date()
    });
  },

  getAll() {
    return this.messages;
  },

  getRecent(limit = 50) {
    return this.messages.slice(-limit);
  },

  clear() {
    this.messages = [];
  },

  formatTime(date) {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = chatMessages;
}
