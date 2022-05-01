const axios = require("axios");
require("dotenv").config();

exports.getLivePrice = async () => {
	try {
		let url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.CRYPTO_API_KEY}&ids=BTC,ETH&interval=1m&convert=USD&per-page=2&page=1`;
		const resp = await axios.get(url);
		return {
			isError: false,
			data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
		};
	} catch (error) {
		console.log("fetch price error-->", JSON.stringify(error));
		return { isError: true };
	}
};
