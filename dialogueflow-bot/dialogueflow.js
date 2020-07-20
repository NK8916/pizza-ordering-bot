const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
async function dialogflowMain(projectId,keyFilename,inpMessage,client) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    console.log("inp",inpMessage)
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({keyFilename});
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: inpMessage,
          // The language used by the client (en-US)
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