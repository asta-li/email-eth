const crypto = require('crypto');

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contractInterface = require("../artifacts/contracts/EmailService.sol/EmailService.json");
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface.abi, signer);

async function main() {
  console.log("Starting server");

  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'REGION'});

  contract.on('NewEmail', (emailAddress, emailBody) => {
    console.log(emailAddress, emailBody);
    sendEmail(decrypt(emailAddress), decrypt(emailBody));
  });
}
main();

function sendEmail(emailAddress, emailBody) {
  console.log(emailAddress, emailBody);

  // Create sendEmail params 
  var params = {
    Destination: {
      ToAddresses: [
        emailAddress,
      ]
    },
    Message: {
      Body: { 
        Html: {
        Charset: "UTF-8",
        Data: "HTML_FORMAT_BODY"
        },
        Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: emailBody
      }
      },
    Source: 'asta@privy.io',
    ReplyToAddresses: [
      'asta@privy.io',
    ],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
      console.log("EMAIL SENT");
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
}

function decrypt(secrets) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_SECRET, secretIv);
  decipher.setAutoPadding(false);
  var dec = decipher.update(secrets,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}