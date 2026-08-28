const socket = {
  io: null,
  connected: false,

  connect() {
    if (!authManager.isAuthenticated()) {
      console.log('Socket: Not authenticated');
      return;
    }

    const token = storage.getToken();
    this.io = io(config.socketUrl, {
      auth: { token }
    });

    this.io.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
      this.updateChatStatus('connected');
    });

    this.io.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
      this.updateChatStatus('disconnected');
    });

    this.io.on('error', (error) => {
      console.error('Socket error:', error);
      this.updateChatStatus('error');
    });

    this.io.on('new_message', (data) => {
      chatModule.addMessage(data);
    });
  },

  disconnect() {
    if (this.io) {
      this.io.disconnect();
      this.connected = false;
    }
  },

  sendMessage(message) {
    if (!this.io || !this.connected) {
      console.error('Socket not connected');
      return false;
    }

    this.io.emit('send_message', { message }, (response) => {
      if (response && response.error) {
        ui.showToast(response.error, 'error');
      }
    });

    return true;
  },

  updateChatStatus(status) {
    const statusDiv = document.getElementById('chat-status');
    if (!statusDiv) return;

    switch(status) {
      case 'connected':
        statusDiv.textContent = 'Connected';
        statusDiv.className = 'chat-status';
        break;
      case 'disconnected':
        statusDiv.textContent = 'Reconnecting...';
        statusDiv.className = 'chat-status loading';
        break;
      case 'error':
        statusDiv.textContent = 'Connection error';
        statusDiv.className = 'chat-status error';
        break;
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = socket;
}
