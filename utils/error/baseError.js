class BaseError extends Error {
	constructor(name, statusCode, isOperational, description) {
		super(description);

		Object.setPrototypeOf(this, new.target.prototype);
		this.path = name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.description = description;
		Error.captureStackTrace(this);
	}
}

module.exports = BaseError;
