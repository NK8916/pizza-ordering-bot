require('dotenv').config();
require('./model')
const express=require('express');
const app=express();

const server=require('http').createServer(app)
const path=require('path');
const {WebhookClient} = require('dialogflow-fulfillment')
const io=require('socket.io')(server)
app.use(express.json())
app.use(express.static('public'))


const dialogueflowMain=require('./dialogueflow-bot/dialogueflow')
const keyFilename=path.resolve('./credentials/credentials.json')
const {register,saveAddress,saveTopping, saveSize,finalizeOrder,checkStatus}=require('./save-details')
const PORT=3000;



io.on('connection',client=>{
    console.log("Connected !!!")
    client.on('message',message=>{
        console.log("message",message)
        dialogueflowMain('yo-yo-pizza-bot-dhkckm',keyFilename,message,client)  
    })
})

app.post('/order',async (req,res)=>{
let agent=new WebhookClient({request:req,response:res})
console.log(agent)

if(Object.keys(agent.parameters).length){
   await saveData(agent.intent,agent)
}

})

async function saveData(intent,agent){
    switch(intent){
        case 'user_phone':
            return register(agent)
        case 'user_address':
            return saveAddress(agent)
        case 'type_of_pizza':
            return saveTopping(agent)
        case 'size_of_pizza':
            return saveSize(agent)
        case 'confirm':{
            const result= await finalizeOrder(agent)
            console.log("result: ",result)
            createResponse(agent,result.order_status,intent)
            return result
        }
        case 'know_status':
            const result=await checkStatus(agent)
            console.log("result: ",result)
            createResponse(agent,result.order_status,intent)
            return result
            
        default:
            throw new Error('Invalid Intent !!!')
    }
}


function createResponse(agent,message,intent){
    function agentHandler(agent){
        agent.add(message)    
    }
    let intentMap=new Map()
    intentMap.set(intent,agentHandler)
    agent.handleRequest(intentMap)
}

 
server.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})