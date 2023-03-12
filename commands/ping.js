const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require("../intents/client");

const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping client')
    .toJSON();

function pingReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'ping') {
            interaction.reply('Ping: ' + client.ws.ping + 'ms');
        }
    });
}

module.exports = { ping, pingReply };