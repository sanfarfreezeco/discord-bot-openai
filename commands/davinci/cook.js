const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { client } = require("../../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
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

const input = new SlashCommandStringOption()
    .setName('name')
    .setDescription('Insert name of the food you want to make')
    .setRequired(true);

const subRecipe = new SlashCommandSubcommandBuilder()
    .setName('recipe')
    .setDescription('Generate food recipe ( - EAT AT YOUR OWN RISK - )')
    .addStringOption(lang)
    .addStringOption(input);

const cook = new SlashCommandBuilder()
    .setName('cook')
    .setDescription('Cook Commands ( - EAT AT YOUR OWN RISK - )')
    .addSubcommand(subRecipe)
    .toJSON();

function cookReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'cook') {
            if (interaction.options.getSubcommand() === 'recipe') {
                async function foodMaker() {
                    const selLang = interaction.options.getString('language');
                    const input = interaction.options.getString('name');
                    if (selLang === 'en') {
                        interaction.reply('Recipe of ' + input + '\n\n' + libstr.generating);
                        const response = await openai.createCompletion({
                            model: libstr.davinci3,
                            prompt: libstr.cookingLangEN + input,
                            temperature: 0.3,
                            max_tokens: 1024,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                        });
                        recipeGenerated = response.data.choices[0].text;
                        interaction.editReply('Recipe of ' + input + '\n' + libstr.cookingWarningLangEN + recipeGenerated + '\n' + libstr.cookingWarningLangEN);
                    }
                    if (selLang === 'id') {
                        interaction.reply('Resep dari ' + input + '\n\n' + libstr.generating);
                        const response = await openai.createCompletion({
                            model: libstr.davinci3,
                            prompt: libstr.cookingLangID + input,
                            temperature: 0.3,
                            max_tokens: 1024,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                        });
                        recipeGenerated = response.data.choices[0].text;
                        interaction.editReply('Resep dari ' + input + '\n' + libstr.cookingWarningLangID + recipeGenerated + '\n' + libstr.cookingWarningLangID);
                    }
                }
                foodMaker();
            }
        }
    });
}

module.exports = { cook, cookReply };