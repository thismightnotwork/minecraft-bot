const mineflayer = require('mineflayer');
const express = require('express');

// ===== CONFIGURATION =====
const SERVER_HOST = '46.224.39.184'; // Replace with your server IP
const SERVER_PORT = 25565;                  // Default Minecraft port
const BOT_NAME = 'KeepAlive';            // Unique bot username

// ===== CREATE MINEFLAYER BOT =====
const bot = mineflayer.createBot({
  host: SERVER_HOST,
  port: SERVER_PORT,
  username: BOT_NAME,
  version: false // auto-detect version
});

bot.on('login', () => {
  console.log('Bot connected! Keeping server awake.');
});

bot.on('end', () => {
  console.log('Bot disconnected, reconnecting in 10 seconds...');
  setTimeout(() => bot.connect(), 10000);
});

// Minimal anti-AFK: jump every 30s
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}, 30000);

// ===== TINY WEB SERVER (FOR RENDER KEEP-ALIVE) =====
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));
