const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require('../../intents/client');
require('dotenv').config();
const { getVoiceConnection } = require('@discordjs/voice')

const leave = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Join to your Voice Channel')
    .toJSON();

function leaveReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'leave') {
            const connection = getVoiceConnection(interaction.channel.guild.id);
            if (!connection) {
                interaction.reply('I\'m already not connected to Voice Channel');
            } if (connection.joinConfig.channelId !== interaction.member.voice.channelId) {
                interaction.reply('You not connected to the same Voice Channel!');
            } else {
                connection.destroy()
                interaction.reply('Disconnected!');
            }
        }
    });
}

module.exports = { leave, leaveReply };