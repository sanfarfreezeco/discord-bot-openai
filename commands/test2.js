const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require('../intents/client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const libstr = require("../lib/libstr");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const { joinVoiceChannel } = require('@discordjs/voice');

const input = new SlashCommandStringOption()
    .setName('input')
    .setDescription('input')
    .setRequired(true);

const test2 = new SlashCommandBuilder()
    .setName('test2')
    .setDescription('test command 2')
    //.addStringOption(input)
    .toJSON();

function test2Reply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'test2') {
            /*
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.channel.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator
            });
             */
            console.log(interaction.member.voice.channelId);
        }
    });
}

module.exports = { test2, test2Reply };