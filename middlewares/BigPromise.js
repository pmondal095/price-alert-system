module.exports = (func) => (req, res, next) =>
	Promise.resolve(func(req, res, next)).catch(next);

// module.exports = function (handler) {
// 	return async (req, res, next) => {
// 		try {
// 			await handler(req, res);
// 		} catch (ex) {
// 			next(ex);
// 		}
// 	};
// };
