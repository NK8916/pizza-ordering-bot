const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
async function dialogflowMain(projectId,keyFilename,inpMessage,client) {
   
    const sessionClient = new dialogflow.SessionsClient({keyFilename});
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, 'sessionId');
  
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: inpMessage,
          languageCode: 'en-US',
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    client.emit('message',result.fulfillmentText)
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
   
    } else {
      console.log(`  No intent matched.`);
    }
  }

function createContext(){

}

 module.exports=dialogflowMain