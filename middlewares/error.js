const errorHandler = (err, req, res, next) => {
	//	console.log(err);
	return res.status(err.statusCode || 500).send({
		path: req.path,
		dateTime: new Date(),
		message: err.description || "Something went wrong !",
	});
};

module.exports = errorHandler;
