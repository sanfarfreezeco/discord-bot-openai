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
   npm install @discordjs/builders discord.js dotenv nodemon openai
   ```

6. Run this code using node.js

   ```shell
   npm run test
   ```
   