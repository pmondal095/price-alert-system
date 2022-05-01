const httpStatusCodes = require("../httpStatusCodes");
const GeneralError = require("./baseError");

class NotFoundError extends GeneralError {
	constructor(
		path,
		description,
		statusCode = httpStatusCodes.NOT_FOUND,
		isOperational = true
	) {
		super(path, statusCode, isOperational, description);
	}
}

class InternalServerError extends GeneralError {
	constructor(
		path,
		description,
		statusCode = httpStatusCodes.INTERNAL_SERVER,
		isOperational = true
	) {
		super(path, statusCode, isOperational, description);
	}
}

class BadRequestError extends GeneralError {
	constructor(
		path,
		description,
		statusCode = httpStatusCodes.BAD_REQUEST,
		isOperational = true
	) {
		super(path, statusCode, isOperational, description);
	}
}

module.exports = { NotFoundError, InternalServerError, BadRequestError };
