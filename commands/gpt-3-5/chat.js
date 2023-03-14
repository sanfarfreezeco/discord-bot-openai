const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { client } = require('../../intents/client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);
const fs = require('fs');

const input = new SlashCommandStringOption()
    .setName('message')
    .setDescription('Insert your message')
    .setRequired(true);

const chat = new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with me')
    .addStringOption(input)
    .toJSON();

function chatReply() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'chat') {
            const file = 'commands/gpt-3-5/chatLogs/' + interaction.channel.id;
            let messages = [];
            let messagesOri = [];
            async function gpt3Turbo() {
                interaction.deferReply();
                const input = interaction.options.getString('messages');
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

module.exports = { chat, chatReply };