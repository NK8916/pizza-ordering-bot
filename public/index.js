var socket = io.connect();
         
var botui = new BotUI('hello-world');
botui.message.add({
content: 'Hello World from bot!'
})

function chat(){
botui.action.text({
  human:true,
  action:{
      placeholder:'What you wanna say !!!'
  }
}).then(res=>{
console.log(res.value)
  socket.emit('message',res.value)
   
})
}
socket.on('message',message=>{
      console.log("message",message)
      chat()
     botui.message.add({
          content:message
      })
  })
chat()
