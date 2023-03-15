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

const chat_gpt4 = new SlashCommandBuilder()
    .setName('chat_gpt4')
    .setDescription('Chat with me (With GPT-4 engine)')
    .addStringOption(input)
    .toJSON();

function chatReplyGPT4() {
    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === 'chat_gpt4') {
            const file = 'commands/gpt4/chatLogs/' + interaction.channel.id;
            let messages = [];
            let messagesOri = [];
            async function gpt4() {
                interaction.deferReply();
                const input = interaction.options.getString('message');
                messages.push({
                    role: "user",
                    content: input
                });
                const completion = await openai.createChatCompletion({
                    model: 'gpt-4',
                    messages: messages
                });
                const reply = completion.data.choices[0].message;
                messages.push(reply);
                interaction.editReply('`GPT-4 engine`\n<@' + interaction.user.id + '>:\n' + input + '\n\n<@' + interaction.client.user.id + '>:\n' + reply.content);
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
                gpt4();
            }
        }
    });
}

module.exports = { chat_gpt4, chatReplyGPT4 };