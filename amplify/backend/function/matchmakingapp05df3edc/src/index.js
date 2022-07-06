/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	SES_EMAIL
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const aws = require('aws-sdk')
 const ses = new aws.SES()
 try {

    exports.handler = async (event) => {
      for (const streamedItem of event.Records) {
        if (streamedItem.eventName === 'INSERT') {
          //pull off items from stream
          const reportID = streamedItem.dynamodb.NewImage.id.S
          const reportedName = streamedItem.dynamodb.NewImage.name.S
          const reportedNameID = streamedItem.dynamodb.NewImage.nameID.S
          const reportedReason = streamedItem.dynamodb.NewImage.reason.S
    
          await ses
              .sendEmail({
                Destination: {
                  ToAddresses: [process.env.SES_EMAIL],
                },
                Source: process.env.SES_EMAIL,
                Message: {
                  Subject: { Data: 'User Report' },
                  Body: {
                    Text: { Data: 
                    `Report ID: ${reportID} 
                    
                    The reported user is ${reportedName} (${reportedNameID}). 
                    
                    Reason: ${reportedReason}
                    ` },
                  },
                },
              })
              .promise()
        }
      }
      return { status: 'done' }
    }
 } catch (e) {
    console.log(e)
 }
 

