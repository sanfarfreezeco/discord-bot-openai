const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require('../../intents/client');
require('dotenv').config();
const { joinVoiceChannel } = require('@discordjs/voice')

const join = new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join to your Voice Channel')
    .toJSON();

function joinReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'join') {
            if (!interaction.member.voice.channelId) {
                interaction.reply('Please join to Voice Channel');
            } else {
                try {
                    joinVoiceChannel({
                        channelId: interaction.member.voice.channelId,
                        guildId: interaction.channel.guild.id,
                        adapterCreator: interaction.channel.guild.voiceAdapterCreator
                    });
                    interaction.reply('Joined!');
                } catch (err) {
                    interaction.reply(err);
                }
            }
        }
    });
}

module.exports = { join, joinReply };