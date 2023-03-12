const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require('../intents/client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const libstr = require("../lib/libstr");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);

const test = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command')
    .toJSON();

function testReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'test') {
            async function testing() {
                interaction.reply(libstr.generating);
                const http = require('http');
                const https = require('https');
                const fs = require('fs');

                const file = fs.createWriteStream('commands/test.png');
                let image;
                imagex = 'https://cdn.openai.com/API/images/guides/image_generation_simple.webp';
                imagey = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-JGjJngFUxHAk1SfnRIY4OS7J/user-rSCHSjBgPl0IQwEoDEh1t4eO/img-8JBKM2NYS27CraXJQxMXWMFD.png?st=2023-02-20T15%3A13%3A26Z&se=2023-02-20T17%3A13%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-20T15%3A50%3A12Z&ske=2023-02-21T15%3A50%3A12Z&sks=b&skv=2021-08-06&sig=LZdTlgDcqZJE1vagCnzGxsuUcndAtKMxe5zgYe8RaEM%3D';
                image = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-JGjJngFUxHAk1SfnRIY4OS7J/user-rSCHSjBgPl0IQwEoDEh1t4eO/img-s6vp9I57ZoyPHe3UTgGDhU6P.png?st=2023-02-20T16%3A08%3A01Z&se=2023-02-20T18%3A08%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-20T15%3A58%3A08Z&ske=2023-02-21T15%3A58%3A08Z&sks=b&skv=2021-08-06&sig=ouCl7EV//3n3CKu0VYUvfn37bq57sdONtRpV%2BzTZLkY%3D';
                /*
                if (image.slice(-4) !== '.png') {
                    interaction.reply('Please use *.png image');
                    return;
                }
                */if (image.slice(0, 7) === 'http://') {
                    http.get(image, function (response) {
                        response.pipe(file);
                        file.on('finish', () => {
                            interaction.reply(fs.createReadStream('commands/test.png'));
                        });
                    });
                }
                if (image.slice(0, 8) === 'https://') {
                    https.get(image, function (response) {
                        response.pipe(file);
                        file.on('finish', () => {
                            // interaction.reply({ files: [{ attachment: 'commands/test.png' }] });
                            imageVar();
                        });
                    });
                }
                async function imageVar() {
                    const response = await openai
                    imageResult = response.data.data[0].url;
                    interaction.editReply(imageResult);
                }
            }
            testing();
        }
    });
}

module.exports = { test, testReply };