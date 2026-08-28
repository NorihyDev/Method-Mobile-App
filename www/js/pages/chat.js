const chatModule = {
  messages: [],

  async init() {
    try {
      const response = await api.messages.getRecent();
      if (response.data) {
        this.messages = response.data;
        this.render();
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }

    socket.connect();
  },

  addMessage(messageData) {
    this.messages.push(messageData);
    this.render();
    this.scrollToBottom();
  },

  render() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    if (this.messages.length === 0) {
      container.innerHTML = `
        <div class="chat-empty">
          <div class="chat-empty-icon">◎</div>
          <div class="chat-empty-title">No messages yet</div>
          <div class="chat-empty-text">Start the conversation</div>
        </div>
      `;
      return;
    }

    container.innerHTML = this.messages.map(msg => `
      <div class="message ${msg.userId === app.user?.id ? 'own' : ''}">
        <div class="message-avatar">${msg.username?.charAt(0).toUpperCase()}</div>
        <div class="message-content">
          <div class="message-username">${msg.username}</div>
          <div class="message-text">${msg.message}</div>
          <div class="message-time">${new Date(msg.created_at).toLocaleTimeString()}</div>
        </div>
      </div>
    `).join('');

    this.scrollToBottom();
  },

  scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
};

function chatPageInit() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  chatModule.init();

  sendBtn.addEventListener('click', () => {
    const message = input.value.trim();
    if (!message) return;

    if (socket.sendMessage(message)) {
      input.value = '';
      input.style.height = 'auto';
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  input.addEventListener('input', (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { chatPageInit, chatModule };
}
