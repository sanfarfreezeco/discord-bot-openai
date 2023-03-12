const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { client } = require("../../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../../lib/libstr');

const inputScript = new SlashCommandStringOption()
    .setName('script')
    .setDescription('Insert your buggy script')
    .setRequired(true);

const subCpp = new SlashCommandSubcommandBuilder()
    .setName('cpp')
    .setDescription('Fix your buggy C++ script')
    .addStringOption(inputScript);

const subCssAPref = new SlashCommandStringOption()
    .setName('option')
    .setDescription('Select option type what you want to fix your css')
    .setRequired(true)
    .addChoices(
        { name: 'Auto Prefix', value: 'prefix' }
    );

const subCss = new SlashCommandSubcommandBuilder()
    .setName('css')
    .setDescription('Fix your buggy CSS Script')
    .addStringOption(subCssAPref)
    .addStringOption(inputScript);

const subJS = new SlashCommandSubcommandBuilder()
    .setName('javascript')
    .setDescription('Fix your buggy JavaScript script')
    .addStringOption(inputScript);

const subPy = new SlashCommandSubcommandBuilder()
    .setName('python')
    .setDescription('Fix your buggy Python script')
    .addStringOption(inputScript);

const fix = new SlashCommandBuilder()
    .setName('fix')
    .setDescription('Fix your buggy Script')
    .addSubcommand(subCpp)
    .addSubcommand(subCss)
    .addSubcommand(subJS)
    .addSubcommand(subPy)
    .toJSON();

function fixReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'fix') {
            const input = interaction.options.getString('script');
            if (interaction.options.getSubcommand() === 'cpp') {
                async function fixcpp() {
                    interaction.reply(libstr.fixCppBugln2 + libstr.fixWaitReply);
                    const response = await openai.createCompletion({
                        model: libstr.davinci3,
                        prompt: libstr.fixCppBug + input + '\n\n' + libstr.fixCppBugln2,
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    cppFixed = response.data.choices[0].text;
                    interaction.editReply(libstr.fixCppBugln2 + cppFixed);
                }
                fixcpp();
            }
            if (interaction.options.getSubcommand() === 'css'){
                if (interaction.options.getString('option') === 'prefix') {
                    interaction.reply(libstr.fixCssBugln2re + libstr.generating);
                    async function fixcssprefix() {
                        const response = await openai.createCompletion({
                            model: libstr.davinci2code,
                            prompt: libstr.fixCssBug + input + libstr.fixCssBugln2,
                            temperature: 0,
                            max_tokens: 1024,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                            stop: '</style>'
                        });
                        const cssFixed = response.data.choices[0].text;
                        interaction.editReply(libstr.fixCssBugln2re + cssFixed);
                    }
                    fixcssprefix();
                }
            }
            if (interaction.options.getSubcommand() === 'javascript') {
                async function fixjs() {
                    interaction.reply(libstr.fixJSBugln2 + libstr.fixWaitReply);
                    const response = await openai.createCompletion({
                        model: libstr.davinci3,
                        prompt: libstr.fixJSBug + input + '\n\n' + libstr.fixJSBugln2,
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    jsFixed = response.data.choices[0].text;
                    interaction.editReply(libstr.fixJSBugln2 + jsFixed);
                }
                fixjs();
            }
            if (interaction.options.getSubcommand() === 'python') {
                async function fixpy() {
                    interaction.reply(libstr.fixPythonBugln2 + libstr.fixWaitReply);
                    const response = await openai.createCompletion({
                        model: libstr.davinci3,
                        prompt: libstr.fixPythonBug + input + '\n\n' + libstr.fixPythonBugln2,
                        temperature: 0,
                        max_tokens: 1024,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0
                    });
                    pyFixed = response.data.choices[0].text;
                    interaction.editReply(libstr.fixPythonBugln2 + pyFixed);
                }
                fixpy();
            }
        }
    });
}

module.exports = { fix, fixReply };