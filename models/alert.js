const mongoose = require("mongoose");
//const validator = require("validator");

const alertSchema = new mongoose.Schema({
	asset: {
		type: String,
		required: [true, "please provide asset"],
	},
	price: {
		type: Number,
		required: [true, "please provide  price"],
	},

	phone: {
		type: String,
		required: [true, "Please provide phone"],
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
	},

	nature: {
		type: String,
		required: [true, "please provide type"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Alert", alertSchema);
