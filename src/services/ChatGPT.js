import OpenAI from "openai";
let key = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true,
});

let tread = null;

export const OpenAIChat = {

    createThread: async () => {
        const thread = await openai.beta.threads.create();
        return thread;
    },
    
    
    addMessageToThread: async (message = 'Como sumo fracciones?', thread) => {
        await openai.beta.threads.messages.create(
            thread.id,
            {
              role: "user",
              content: message
            }
        );
    },
    
    runThread: async (thread) => {
        const run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            { 
              assistant_id: "asst_zKIUZMFzW26p8Ub99ySQTRPY",
            }
        );
        return run;
    },
    
    runResponse: async (run) => {
    
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
              run.thread_id
            );
            
            //Return the last message from the bot
            return(messages.data[0].content[0].text.value);
          } else {
            console.log(run.status);
          }
    },

    sendMessage: async (message) => {
        if (!tread) {
            tread = await OpenAIChat.createThread();
        }
        await OpenAIChat.addMessageToThread(message, tread);
        const run = await OpenAIChat.runThread(tread);
        let response = await OpenAIChat.runResponse(run);
        console.log(response);
        return response;
    }

}

export default OpenAIChat;