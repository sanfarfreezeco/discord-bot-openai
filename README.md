# Discord Bot with OpenAI API

## Install Instruction

1. Install Node.js

   [Download Here](https://nodejs.org/en/download/)

2. Clone this repository

   1. Using git clone
   
      ```shell
      git clone https://github.com/sanfarfreezeco/discord-bot-openai.git
      ```
      
   2. Using zip file
   
      Click 'Code' on the right of repository

      ![image](https://cdn1.aurellyan.my.id/md_files/github_code-btn.png)
      
      Then click 'Download Zip' to download the code
   
      ![image](https://cdn1.aurellyan.my.id/md_files/github_download_zip-btn.png)

      After download finished, extract it

3. Open this folder code, then make new file `.env`

4. Copy this code into `.env`

   ```text
   TOKEN=<your_discord_bot_token>
   CLIENT_ID=<your_bot_id>
   OPENAI_API=<your_openai_api_token>
   ```
   
   Change the `<your_discord_bot_token>` with your discord bot token
   
   Change the `<your_bot_id>` with discord bot id

   Change the `<your_openai_api_token>` with your OpenAI API token

5. Install this module

   ```shell
   npm install @discordjs/builders @discordjs/voice discord.js dotenv nodemon openai
   ```

6. Run this code using node.js

   ```shell
   npm run test
   ```

## Features

- [x] `/ping` Ping
- [x] `/image` An Image command (using DALL•E) max generation is 10
   - [x] `/image generate` Generate image form your prompt
   - [x] `/image variation` Generate variation of image you send (only from web) (must be from `http://` or `https://`)
- [x] `/color` Create a hex color code from your descrpition
- [x] `/cook` Create cooking recipe from your food description
- [x] `/fix` Fix your code (not always correct)
   - [x] `/fix css` Fix your CSS code (only support autoprefix)
   - [x] `/fix cpp` Fix your C++ code (not always correct)
   - [x] `/fix javascript` Fix your JS code (not always correct)
   - [x] `/fix python` Fix your Python code (not always correct) 
- [x] `/movie` Create a description from your movie name
- [x] `/translate` Translate (not always correct) (only support 5 language: English, Indonesian, Japanese, Chinese, Russian)
- [x] `/chat` Chat with me (Ask anything) (Using GPT 3.5 Turbo Engine) (using `/chat` every message)
- [ ] `/chat_gpt4` Chat with me (Ask anything) (Using GPT-4 Engine (Closed Beta *Coming soon)) (using `/chat` every message)
- [ ] `/join` Join voice channel (in progress)
- [ ] `/leave` Leave voice channel (in progress)
- [ ] `/play` Play music (in progress)
- [ ] `/pause` Pause music (in progress)
- [ ] `/stop` Stop music (in progress)

---

- [x] `/test`, `/test2`, `/test3` Test your own code

---
