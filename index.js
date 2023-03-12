const { REST, Routes } = require('discord.js');
const { client } = require('./intents/client');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

require('events').EventEmitter.defaultMaxListeners = 20;

client.on('ready', () => {
    console.log('ready!');
});

const { commands, reply } = require('./intents/loadCommands');
reply();

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function main() {
    try {
        console.log('loading commands!');
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
};

main();