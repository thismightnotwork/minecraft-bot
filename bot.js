const mineflayer = require('mineflayer');
const express = require('express');

const SERVER_HOST = '46.224.39.184';
const SERVER_PORT = 53265;
const BOT_NAME = 'KeepAliveBot';
const MC_VERSION = '1.21.10'; // replace with your exact server version

const bot = mineflayer.createBot({
  host: SERVER_HOST,
  port: SERVER_PORT,
  username: BOT_NAME,
  version: MC_VERSION
});

bot.on('login', () => {
  console.log('Bot connected! Keeping server awake.');

  // Minimal anti-AFK
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 60000);
});

bot.on('end', () => {
  console.log('Bot disconnected, reconnecting in 10 seconds...');
  setTimeout(() => bot.connect(), 10000);
});

// Tiny web server for Render keep-alive
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));
