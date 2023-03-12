const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require('../intents/client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const libstr = require("../lib/libstr");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

const test3 = new SlashCommandBuilder()
    .setName('test3')
    .setDescription('test command 3')
    .toJSON();

function test3Reply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'test3') {
            const embed = new EmbedBuilder()
                .setDescription('Ping: ' + client.ws.ping + 'ms');

            interaction.reply({ embeds: [embed] });
        }
    });
}

module.exports = { test3, test3Reply };