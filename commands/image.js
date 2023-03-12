const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { client } = require("../intents/client");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const libstr = require('../lib/libstr');
const fs = require('fs');
const http = require('http');
const https = require('https');

const input = new SlashCommandStringOption()
    .setName('description')
    .setDescription('Insert description of the image what you want')
    .setRequired(true);

const url = new SlashCommandStringOption()
    .setName('url')
    .setDescription('Insert URL of the image what you want (MUST BE *.PNG AND 1:1)')
    .setRequired(true);

const number = new SlashCommandStringOption()
    .setName('amount')
    .setDescription('Select amount of image generation')
    .setRequired(true)
    .addChoices(
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' }
    );

const size = new SlashCommandStringOption()
    .setName('size')
    .setDescription('Select resolution image size')
    .setRequired(true)
    .addChoices(
        { name: '256 x 256', value: '256x256' },
        { name: '512 x 512', value: '512x512' },
        { name: '1024 x 1024', value: '1024x1024' }
    );

const imageGenerate = new SlashCommandSubcommandBuilder()
    .setName('generate')
    .setDescription('Generate new image from your description')
    .addStringOption(number)
    .addStringOption(size)
    .addStringOption(input);

const imageVariation = new SlashCommandSubcommandBuilder()
    .setName('variation')
    .setDescription('Generate new image variation')
    .addStringOption(number)
    .addStringOption(size)
    .addStringOption(url);

const image = new SlashCommandBuilder()
    .setName('image')
    .setDescription('Generate new image')
    .addSubcommand(imageGenerate)
    .addSubcommand(imageVariation)
    .toJSON();

function imageReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'image') {
            const number = parseInt(interaction.options.getString('amount'));
            const size = interaction.options.getString('size');
            if (interaction.options.getSubcommand() === 'generate') {
                async function imageGen() {
                    const input = interaction.options.getString('description');
                    interaction.reply(libstr.generating + ' ' + input);
                    try {
                        const response = await openai.createImage({
                            prompt: input,
                            n: number,
                            size: size
                        });
                        interaction.editReply(input + '\nSize: ' + size);
                        for (let n = 0; n < number; n++) {
                            imageResult = response.data.data[n].url;
                            interaction.followUp(imageResult);
                        }
                    } catch (error) {
                        if (error.response) {
                            const errorMessage = error.response.data.error.message;
                            interaction.editReply(libstr.generating + ' ' + input + ' Error\n\`' + errorMessage + '\`\nPlaese try another keyword');
                        } else {
                            console.log(error.message);
                            interaction.editReply(libstr.generating + ' ' + input + ' Error\n\`' + error.message + '\`');
                        }
                    }
                }
                imageGen();
            }
            if (interaction.options.getSubcommand() === 'variation') {
                interaction.reply(libstr.generating);
                const url = interaction.options.getString('url');
                const file = fs.createWriteStream('commands/imageVar/tmp.png');
                /*if (url.slice(-4) !== '.png') {
                    interaction.reply('Please use *.png image');
                    return;
                }
                 */
                if (url.slice(0, 7) === 'http://') {
                    http.get(url, function (downImg) {
                        downImg.pipe(file);
                        file.on('finish', () => { imageVar(); })
                    });
                }
                if (url.slice(0, 8) === 'https://') {
                    https.get(url, function (downImg) {
                        downImg.pipe(file);
                        file.on('finish', () => { imageVar(); })
                    });
                }
                async function imageVar() {
                    try {
                        const response = await openai.createImageVariation(
                            fs.createReadStream('commands/imageVar/tmp.png'),
                            number,
                            size
                        );
                        interaction.editReply({ content: 'Original image', files: [{ attachment: 'commands/imageVar/tmp.png' }] });
                        for (let n = 0; n < number; n++) {
                            const imageResult = response.data.data[n].url;
                            interaction.followUp(imageResult);
                        }
                    } catch (error) {
                        if (error.response) {
                            interaction.editReply(libstr.generating + ' Error\n\`' + error.response.data.error.message + '\`\nPlease try another image\\nImage must be in *.png format and 1:1 scale');
                        } else {
                            interaction.editReply(libstr.generating + ' Error\n\`' + error.message + '\`\nPlease try another image\\nImage must be in *.png format and 1:1 scale');
                        }
                    }
                }
            }
        }
    });
}

module.exports = { image, imageReply };