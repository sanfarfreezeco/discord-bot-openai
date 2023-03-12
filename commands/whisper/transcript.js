const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require("../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../lib/libstr');
const fs = require('fs');

const input = new SlashCommandStringOption()
    .setName('prompt')
    .setDescription('Insert yout prompt')
    .setRequired(true);

const transcript = new SlashCommandBuilder()
    .setName('transcript')
    .setDescription('Create transcription from your command')
    .addStringOption(input)
    .toJSON();

function transcriptReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'transcript') {
            async function audioProc() {
                const response = openai.createTranscription({
                    file: fs.creat
                })
            }
        }
    });
}