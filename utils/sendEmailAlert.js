const nodemailer = require("nodemailer");

exports.sendEmailNotification = async (options) => {
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const message = {
			from: "pmondal095@gmail.com",
			to: options.email,
			subject: options.subject,
			text: options.message,
		};
		await transporter.sendMail(message);
		return { error: false };
	} catch (error) {
		console.error("send-email-error", error);
		return {
			error: true,
			message: "Couldn't send email",
		};
	}
};
