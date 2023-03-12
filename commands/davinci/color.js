const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require("../../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../../lib/libstr');

const input = new SlashCommandStringOption()
    .setName('description')
    .setDescription('Insert description for the color what you want to get it')
    .setRequired(true);

const color = new SlashCommandBuilder()
    .setName('color')
    .setDescription('Generate new color from your description')
    .addStringOption(input)
    .toJSON();

function colorReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'color') {
            async function colorGen() {
                const input = interaction.options.getString('description');
                interaction.reply(input + '\n\n' + libstr.generating);
                const response = await openai.createCompletion({
                    model: libstr.davinci3,
                    prompt: libstr.color + input,
                    temperature: 0,
                    max_tokens: 64,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                });
                colorGenerated = response.data.choices[0].text;
                interaction.editReply(input + colorGenerated);
            };
            colorGen();
        }
    });
}

module.exports = { color, colorReply };