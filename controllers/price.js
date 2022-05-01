const Resolve = require("../middlewares/BigPromise");
const { InternalServerError } = require("../utils/error/error");
const currentPrice = require("../utils/fetchPrice");

exports.getLivePrice = Resolve(async (req, res, next) => {
	let prices = await currentPrice();

	if (prices.isError) {
		return next(new InternalServerError(req.path, "Nomics API not working"));
	}

	return res.status(200).json({
		success: true,
		"price-data": prices.data,
	});
});
