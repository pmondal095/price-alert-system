const CronJob = require("cron").CronJob;
const Queue = require("bull");
const { getLivePrice } = require("../fetchPrice");
const Alert = require("../../models/alert");
const { notificationHandler } = require("../alertHandler");

//creates a queue
let alertQueue = new Queue("alerts", process.env.REDIS_URL);

// consumer process
alertQueue.process(notificationHandler);

// alerts through email at an interval of 25 secs
const sendAlert = new CronJob(
	"*/25 * * * * *",

	async function () {
		const currentPrices = await getLivePrice();
		if (currentPrices.error) return;

		let priceObj = {
			BTC: currentPrices.data.BTC,
			ETH: currentPrices.data.ETH,
		};
		console.log(priceObj);
		let alerts = await Alert.find({});

		for (let i = 0; i < alerts.length; i++) {
			if (
				alerts[i].nature === "above" &&
				alerts[i].price <= parseFloat(priceObj[alerts[i].asset])
			) {
				let message = `Price of ${
					alerts[i].asset
				} has just exceeded your alert price of ${
					alerts[i].price
				} USD. Current price is ${priceObj[alerts[i].asset]} USD`;

				let title = `${alerts[i].asset} is up!`;
				let recipient_email = alerts[i].email;
				let recipient_phone = alerts[i].phone;

				alertQueue.add(
					{
						message,
						title,
						email: recipient_email,
						phone: recipient_phone,
					},
					{
						attempts: 3,
						backoff: 3000,
					}
				);
				await Alert.deleteOne({ _id: alerts[i]._id });
				alerts.splice(i, 1);
			} else if (
				alerts[i].nature === "below" &&
				alerts[i].price > parseFloat(priceObj[alerts[i].asset])
			) {
				let message = `Price of ${
					alerts[i].asset
				} fell below your alert price of ${
					alerts[i].price
				} USD. Current price is ${priceObj[alerts[i].asset]} USD`;

				let title = `${alerts[i].asset} is down!`;

				let recipient_email = alerts[i].email;
				let recipient_phone = alerts[i].phone;
				alertQueue.add(
					{
						message,
						title,
						email: recipient_email,
						phone: recipient_phone,
					},
					{
						attempts: 3,
						backoff: 3000,
					}
				);
				await Alert.deleteOne({ _id: alerts[i]._id });
				alerts.splice(i, 1);
			}
		}
	}
);

sendAlert.start();
