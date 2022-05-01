const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendSMSNotification = async (options) => {
	return await client.messages
		.create({
			body: options.message,
			from: "+17435002734",
			to: options.phone,
		})
		.then((message) => {
			return {
				error: false,
				sid: message.sid,
			};
		})
		.catch((error) => {
			console.log(error);
			return {
				error: true,
				message: " can't send message to TWILIO API",
			};
		});
};
