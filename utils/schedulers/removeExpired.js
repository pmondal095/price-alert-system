const CronJob = require("cron").CronJob;
const Alert = require("../../models/alert");

// fetch all current alerts

var removeExpired = new CronJob(
	"*/10 * * * * *", // Run every 5 secs
	async function () {
		let alerts = await Alert.find({});

		for (let i = 0; i < alerts.length; i++) {
			if (
				new Date().getTime() - new Date(alerts[i].createdAt).getTime() >
				30000
			) {
				console.log(
					"time difference :",
					new Date().getTime() - new Date(alerts[i].createdAt).getTime()
				);
				await Alert.deleteOne({ _id: alerts[i]._id });
			}
		}
	}
);
removeExpired.start();

//removeAlerts();
