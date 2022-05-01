const Resolve = require("../middlewares/BigPromise");
const { BadRequestError } = require("../utils/error/error");
const Alert = require("../models/alert");

exports.createAlert = Resolve(async (req, res, next) => {
	const { asset, price, phone, nature, email } = req.body;

	if (!asset || !price || !phone || !nature || !email) {
		return next(
			new BadRequestError(
				req.path,
				"Please provide asset,price,phone,email, type!"
			)
		);
	}

	const alert = await Alert.create({
		asset,
		price,
		phone,
		nature,
		email,
		phone,
		createdAt: new Date(),
	});

	console.log(alert);

	return res.status(201).json({
		success: true,
		message: "Alert created successfully ",
	});
});

exports.getAllAlerts = Resolve(async (req, res, next) => {
	const alerts = await Alert.find({});

	return res.status(200).json({
		success: true,
		alerts,
	});
});
