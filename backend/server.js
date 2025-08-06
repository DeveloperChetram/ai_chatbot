const app = require('./src/app')
const { createServer } = require("http");
const aiResponse = require('./src/services/ai.service')
const { Server } = require("socket.io");



const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {

    console.log("a user connected");

    
    socket.on('disconnect',()=>{
      console.log('user disconnected')
    })
    
    socket.on('message',async (data)=>{
      const response =await aiResponse(data.prompt)
      socket.emit('response',{response})
    })
      });
    httpServer.listen(5000,()=>{
      console.log('socket io server is running')
    });
    
