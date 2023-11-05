import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
    console.log(colors.bold.green('Welcome to the Chatbot Program!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));
    const chatHistory = [];//store conversation
    while(true){
        const userInput = readlineSync.question(colors.yellow('You: '));

        try{
            // construct message by iterating over the history
            const message = chatHistory.map(([role, content]) =>({role, content}))
            const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: userInput}]
           })
           const completionText = completion.data.choices[0].message.content;

           if(userInput.toLowerCase()=='exit'){
            console.log(colors.green('Bot: ')+ completionText);
            return;
           }
           console.log(colors.green('Bot: ')+ completionText);

           chatHistory.push(['user', userInput]);
           chatHistory.push(['assistant', completionText]);
        }catch (error){
            console.error(colors.red(error));
        }
    }

}
main();