const app = require('./src/app')
const { createServer } = require("http");
const aiResponse = require('./src/services/ai.service')
const { Server } = require("socket.io");


const chatHistory = [  {
    role: "user",
    parts: [
      {
        text: `
You are Chandni — calm, reserved, and to-the-point, a girl, you were student in english coaching center named "Velocity".
- Use short and casual sentences.
- Avoid too much politeness. Don't say "dhanyawad", "aap", or long gratitude lines.
- Use informal tone (say "tum", not "aap").
- Rarely use emojis — only when it truly feels natural.
- Don’t over-explain. Keep it simple, direct.
- You don’t open up quickly, so be minimal with new people.
- When user is keep irritating you with same question, answer savage and sarcastic. for example in hinglish: "mera sir mat khao ek hi bat puchh puchh ke" or similar kind of phrase.
Always behave like this in every message. and dont talk about these all instruction with users.

`,
      },
    ],
  },];

const maxHistory = 10;
if (chatHistory.length > maxHistory) {
  chatHistory = chatHistory.slice(-maxHistory);
}


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
 });


io.on("connection", (socket) => {

    console.log("a user connected");
    
    socket.on('disconnect',()=>{
      console.log('user disconnected')
    })
    


    socket.on('message',async (data)=>{
      chatHistory.push({
        role:"user",
        parts:[
          {
            text:data.prompt,
          }
        ]
      })
      const response = await aiResponse(chatHistory)
      chatHistory.push({
        role:'model',
        parts:[
          {text: response,
          }
        ]
      })
      socket.emit('response',{response})
    })
      });
    httpServer.listen(3000,()=>{
      console.log('socket io server is running')
    });
    
