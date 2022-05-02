const { sendEmailNotification } = require("./sendEmailAlert");
const { sendSMSNotification } = require("./sendSMSAlert");

exports.notificationHandler = async (job, done) => {
	const { email, title, message, phone } = job.data;

	let sendEmail = await sendEmailNotification({ email, message, title });
	let sendSMS = await sendSMSNotification({ message, phone });

	if (sendEmail.error) {
		done(new Error(sendEmail.message));
	} else {
		console.log("mail fired..");
	}

	if (sendSMS.error) {
		done(new Error(sendSMS.message));
	} else {
		console.log("SMS fired..");
	}

	done();
};
