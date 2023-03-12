const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require("../../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../../lib/libstr');

const fromLang = new SlashCommandStringOption()
    .setName('from')
    .setDescription('Select Language')
    .setRequired(true)
    .addChoices(
        { name: 'Chinese', value: 'cn' },
        { name: 'English', value: 'en' },
        { name: 'Indonesian', value: 'id' },
        { name: 'Japanese', value: 'jp' },
        { name: 'Russian', value: 'ru' }
    );

const toLang = new SlashCommandStringOption()
    .setName('to')
    .setDescription('Select Language')
    .setRequired(true)
    .addChoices(
        { name: 'Chinese', value: 'cn' },
        { name: 'English', value: 'en' },
        { name: 'Indonesian', value: 'id' },
        { name: 'Japanese', value: 'jp' },
        { name: 'Russian', value: 'ru' }
    );

const inputStr = new SlashCommandStringOption()
    .setName('message')
    .setDescription('Insert message')
    .setRequired(true);

const translate = new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translate to other language')
    .addStringOption(fromLang)
    .addStringOption(inputStr)
    .addStringOption(toLang)
    .toJSON();

function translateReply() {
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'translate') {
            const from = interaction.options.getString('from');
            const to = interaction.options.getString('to');
            const input = interaction.options.getString('message');
            const Lang = [
                'Chinese ',
                'English ',
                'Indonesian ',
                'Japanese ',
                'Russian '
            ]
            let fromName;
            let toName;
            async function translator() {
                if (to === 'cn') {
                    toName = Lang[0];
                }
                if (to === 'en') {
                    toName = Lang[1];
                }
                if (to === 'id') {
                    toName = Lang[2];
                }
                if (to === 'jp') {
                    toName = Lang[3];
                }
                if (to === 'ru') {
                    toName = Lang[4];
                }
                if (from === 'cn') {
                    fromName = Lang[0];
                    interaction.reply(fromName + libstr.translateStr + input + '.\n\n' + libstr.translating);
                    const response = await openai.createCompletion({
                        model: libstr.curie1,
                        prompt: libstr.translateCN + toName + libstr.translateStr + '' + input + '\n\n',
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    translated = response.data.choices[0].text;
                    interaction.editReply(fromName + libstr.translateStr + '\n' + input + '.\n\n' + toName + libstr.translateStr + '\n' + translated);
                }
                if (from === 'en') {
                    fromName = Lang[1];
                    interaction.reply(fromName + libstr.translateStr + input + '.\n\n' + libstr.translating);
                    const response = await openai.createCompletion({
                        model: libstr.curie1,
                        prompt: libstr.translateEN + toName + libstr.translateStr + '' + input + '\n\n',
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    translated = response.data.choices[0].text;
                    interaction.editReply(fromName + libstr.translateStr + '\n' + input + '.\n\n' + toName + libstr.translateStr + '\n' + translated);
                }
                if (from === 'id') {
                    fromName = Lang[2]
                    interaction.reply(fromName + libstr.translateStr + input + '.\n\n' + libstr.translating);
                    const response = await openai.createCompletion({
                        model: libstr.curie1,
                        prompt: libstr.translateID + toName + libstr.translateStr + '' + input + '\n\n',
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    translated = response.data.choices[0].text;
                    interaction.editReply(fromName + libstr.translateStr + '\n' + input + '.\n\n' + toName + libstr.translateStr + '\n' + translated);
                }
                if (from === 'jp') {
                    fromName = Lang[3]
                    interaction.reply(fromName + libstr.translateStr + input + '.\n\n' + libstr.translating);
                    const response = await openai.createCompletion({
                        model: libstr.curie1,
                        prompt: libstr.translateJP + toName + libstr.translateStr + '' + input + '\n\n',
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    translated = response.data.choices[0].text;
                    interaction.editReply(fromName + libstr.translateStr + '\n' + input + '.\n\n' + toName + libstr.translateStr + '\n' + translated);
                }
                if (from === 'ru') {
                    fromName = Lang[4];
                    interaction.reply(fromName + libstr.translateStr + input + '.\n\n' + libstr.translating);
                    const response = await openai.createCompletion({
                        model: libstr.curie1,
                        prompt: libstr.translateRU + toName + libstr.translateStr + '' + input + '\n\n',
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    translated = response.data.choices[0].text;
                    interaction.editReply(fromName + libstr.translateStr + '\n' + input + '.\n\n' + toName + libstr.translateStr + '\n' + translated);
                }
            }
            translator();
        }
    });
}

module.exports = { translate, translateReply };