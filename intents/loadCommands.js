const { ping, pingReply } = require('../commands/ping');
const { image, imageReply } = require('../commands/image');

const { color, colorReply } = require('../commands/davinci/color');
const { cook, cookReply } = require('../commands/davinci/cook');
const { fix, fixReply } = require('../commands/davinci/fix');
const { movie, movieReply } = require('../commands/davinci/movie');
const { translate, translateReply } = require('../commands/davinci/translate');

const { chat, chatReply } = require('../commands/gpt-3-5/chat');
const { chat_gpt4, chatReplyGPT4 } = require('../commands/gpt4/chat-GPT4');

const { test, testReply } = require('../commands/test');
const { test2, test2Reply } = require('../commands/test2');
const { test3, test3Reply } = require('../commands/test3');

function reply() {
    pingReply();
    imageReply();

    cookReply();
    colorReply();
    fixReply();
    movieReply();
    translateReply();

    chatReply();
    chatReplyGPT4();

    testReply();
    test2Reply();
    test3Reply();
};

const commands = [
    ping,
    image,

    cook,
    color,
    fix,
    movie,
    translate,

    chat,
    chat_gpt4,

    test,
    test2,
    test3
]

module.exports = { commands, reply }