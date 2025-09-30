// const TelegramBot = require("node-telegram-bot-api");

const token = "8071643788:AAFPzTgZkNMr9wgcBkOHqkXIEDTI_4tZvX4";

// app.js
const TelegramBot = require("node-telegram-bot-api");

// 🔑 Tokeningizni shu yerga yozing


// 👤 Admin ID (o'zingizni telegram ID raqamingizni yozing)
const ADMIN_ID = 123456789;

// Botni polling rejimida ishga tushirish
const bot = new TelegramBot(token, { polling: true });

// /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "🐾 Salom! Men hayvonlarga yordam beruvchi botman.\n\nRasm va izoh yuboring, biz uni volontyorlarga yetkazamiz."
  );
});

// Foto yuborilganda
bot.on("photo", (msg) => {
  const chatId = msg.chat.id;
  const photoId = msg.photo[msg.photo.length - 1].file_id;

  bot.sendMessage(chatId, "✅ Rasm qabul qilindi. Endi izoh yuboring ✍️");

  // Adminni xabardor qilish
  bot.sendPhoto(ADMIN_ID, photoId, {
    caption: `📩 Yangi rasm yuborildi.\nFoydalanuvchi: @${msg.from.username || "no_username"}\nID: ${msg.from.id}`,
  });
});

// Matn yuborilganda
bot.on("text", (msg) => {
  const chatId = msg.chat.id;

  // Agar bu admin bo'lsa va /send bilan boshlansa
  if (msg.from.id === ADMIN_ID && msg.text.startsWith("/send")) {
    const text = msg.text.replace("/send ", "");
    bot.sendMessage(chatId, "✅ Xabar volontyorlarga yuborildi!");
    // Hozircha faqat adminning o'ziga qaytadi,
    // istasangiz volunteerlar ro‘yxatini saqlab, hammaga jo‘natishingiz mumkin
    return;
  }

  if (msg.text !== "/start") {
    bot.sendMessage(chatId, "✅ Izohingiz qabul qilindi. Rahmat!");

    // Adminni xabardor qilish
    bot.sendMessage(
      ADMIN_ID,
      `📩 Yangi izoh:\nFoydalanuvchi: @${msg.from.username || "no_username"}\nID: ${msg.from.id}\n\n${msg.text}`
    );
  }
});

