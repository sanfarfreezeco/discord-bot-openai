const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { client } = require("../../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../../lib/libstr');

const lang = new SlashCommandStringOption()
    .setName('language')
    .setDescription('Set language output')
    .setRequired(true)
    .addChoices(
        { name: 'English', value: 'en' },
        { name: 'Bahasa Indonesia', value: 'id' }
    );

const inputMovieName = new SlashCommandStringOption()
    .setName('name')
    .setDescription('Insert name of the movie')
    .setRequired(true);

const subEmoji = new SlashCommandSubcommandBuilder()
    .setName('emoji')
    .setDescription('Generate emoji by the movie name')
    .addStringOption(inputMovieName);

const subStoryline = new SlashCommandSubcommandBuilder()
    .setName('storyline')
    .setDescription('Review the movie just by name')
    .addStringOption(lang)
    .addStringOption(inputMovieName);

const movie = new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Movie Commands')
    .addSubcommand(subStoryline)
    .addSubcommand(subEmoji)
    .toJSON();

function movieReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'movie') {
            if (interaction.options.getSubcommand() === 'storyline') {
                async function storyliner() {
                    const selLang = interaction.options.getString('language');
                    const input = interaction.options.getString('name');
                    if (selLang === 'en') {
                        interaction.reply(input + '\n' + libstr.generating);
                        const response = await openai.createCompletion({
                            model: libstr.davinci3,
                            prompt: libstr.movieStoryLangEN + input + ': ',
                            temperature: 0,
                            max_tokens: 1024,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0
                        });
                        storylineGenerated = response.data.choices[0].text;
                        interaction.editReply(input + '\n' + storylineGenerated);
                    }
                    if (selLang === 'id') {
                        interaction.reply(input + '\n' + libstr.generating);
                        const response = await openai.createCompletion({
                            model: libstr.davinci3,
                            prompt: libstr.movieStoryLangID + input + ': ',
                            temperature: 0,
                            max_tokens: 1024,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0
                        });
                        storylineGenerated = response.data.choices[0].text;
                        interaction.editReply(input + '\n' + storylineGenerated);
                    }
                }
                storyliner();
            }
            if (interaction.options.getSubcommand() === 'emoji') {
                async function moviemojiMaker() {
                    const input = interaction.options.getString('name');
                    interaction.reply(input + ': ' + libstr.generating);
                    const response = await openai.createCompletion({
                        model: libstr.davinci3,
                        prompt: libstr.moviemoji + input + ': ',
                        temperature: 0.8,
                        max_tokens: 60,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0,
                        stop: '\n'
                    });
                    emojiGenerated = response.data.choices[0].text;
                    interaction.editReply(input + ': ' + emojiGenerated);
                }
                moviemojiMaker();
            }
        }
    });
}

module.exports = { movie, movieReply };