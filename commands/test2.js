const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require('../intents/client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const libstr = require("../lib/libstr");
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API});
const openai = new OpenAIApi(configuration);
const fs = require('fs');

const input = new SlashCommandStringOption()
    .setName('input')
    .setDescription('input')
    .setRequired(true);

const test2 = new SlashCommandBuilder()
    .setName('test2')
    .setDescription('test command 2')
    .addStringOption(input)
    .toJSON();

function test2Reply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'test2') {
            let file = 'commands/chats/' + interaction.channel.id;
            let messages = [];
            let messagesOri = [];
            async function gpt3Turbo() {
                interaction.deferReply();
                const input = interaction.options.getString('input');
                messages.push({
                    role: "user",
                    content: input
                });
                const completion = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: messages
                });
                const reply = completion.data.choices[0].message;
                messages.push(reply);
                interaction.editReply('<@' + interaction.user.id + '>:\n' + input + '\n\n<@' + interaction.client.user.id + '>:\n' + reply.content);
                messagesOri = messagesOri.concat(messages);
                const json = JSON.stringify(messagesOri);
                fs.writeFileSync(file, json);
            }
            if (fs.existsSync(file)) {
                const prevFile = fs.readFileSync(file);
                const parseFile = JSON.parse(prevFile);
                messagesOri = parseFile.slice(0, -15);
                messages = parseFile.slice(-15);
                gpt3Turbo();
            } else {
                messages = [{
                    role: "system",
                    content: 'You are a helpful assistant'
                }];
                const json = JSON.stringify(messages);
                fs.writeFileSync(file, json);
                gpt3Turbo();
            }
        }
    });
}

module.exports = { test2, test2Reply };