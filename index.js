var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });
exports.handler = async function (event) {
  const message = JSON.parse(event.Records[0].Sns.Message);
  console.log("Message received from SNS:", message);

  const { email, token } = message;
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Click the link below to verfiy your email address: http://dev.jenny-hung.me/v1/verifyUserEmail?email=${email}&token=${token}`,
        },
      },

      Subject: { Data: "Email Verification" },
    },
    Source: "noreply@dev.jenny-hung.me",
  };

  return ses.sendEmail(params).promise();
};
