const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Daftar command (slash command)
const commands = [
  {
    name: 'rules',
    description: 'Tampilkan peraturan server'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Register command ke server
(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Bot online sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rules') {
    const rulesEmbed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle('📜 Peraturan Server')
      .addFields(
        { name: 'Aturan No. 1', value: 'Bersikaplah hormat: Perlakukan orang lain dengan kebaikan, kesopanan, dan rasa hormat. Pelecehan, ujaran kebencian, diskriminasi, atau segala bentuk perilaku yang menyinggung tidak akan ditoleransi.' },
        { name: 'Aturan No. 2', value: 'Dilarang melakukan spam: Hindari memposting konten yang berulang atau tidak relevan secara berlebihan. Ini termasuk membanjiri obrolan, penggunaan emoji yang berlebihan, atau mengirim pesan pribadi yang tidak diminta kepada anggota lain.' },
        { name: 'Aturan No. 3', value: 'Jaga agar diskusi tetap pantas: Jangan membagikan konten eksplisit, konten dewasa, atau konten NSFW (*Not Safe for Work*). Pastikan diskusi dan media dilakukan di saluran yang telah ditentukan dan sesuai dengan pedoman konten server.' },
        { name: 'Aturan No. 4', value: 'Dilarang melakukan serangan pribadi atau perundungan: Jangan melakukan serangan pribadi, perundungan siber (*cyberbullying*), atau pelecehan yang ditujukan kepada anggota lain. Perbedaan pendapat diperbolehkan, namun jagalah agar diskusi tetap santun dan konstruktif.' },
        { name: 'Aturan No. 5', value: 'Hargai privasi dan kerahasiaan: Jangan membagikan informasi pribadi orang lain tanpa izin mereka. Hargai privasi semua anggota dan hindari membagikan informasi sensitif atau rahasia di saluran publik.' },
        { name: 'Aturan No. 6', value: 'Patuhi Ketentuan Layanan Discord: Patuhi Pedoman Komunitas dan Ketentuan Layanan Discord. Pelanggaran apa pun dapat mengakibatkan tindakan disipliner atau pengeluaran dari server.' },
        { name: 'Aturan No. 7', value: 'Dilarang beriklan atau melakukan promosi diri: Jangan menggunakan server untuk mempromosikan situs web, produk, atau layanan eksternal tanpa izin sebelumnya dari moderator server. Promosi diri hanya diperbolehkan di saluran yang telah ditentukan, jika diizinkan.' },
        { name: 'Aturan No. 8', value: 'Gunakan bahasa yang pantas: Hindari penggunaan kata-kata kasar yang berlebihan, bahasa vulgar, atau penggunaan huruf kapital secara berlebihan. Ciptakan lingkungan yang ramah dan inklusif bagi semua anggota.' },
        { name: 'Aturan No. 9', value: 'Gunakan saluran sesuai peruntukannya: Posting konten di saluran yang tepat dan hindari diskusi di luar topik (*off-topic*). Jika Anda ragu di mana harus memposting, mintalah panduan kepada moderator.' }
      )
      .setFooter({ text: 'Terima kasih sudah mematuhi peraturan 🙌' })
      .setTimestamp();

    await interaction.reply({ embeds: [rulesEmbed], ephemeral: false });
  }
});
