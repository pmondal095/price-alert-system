const app = require("./app");
const connectWithDb = require("./config/db");
require("dotenv").config();

connectWithDb();

// removing expired files
require("./utils/schedulers/removeExpired");
// firing notification services
require("./utils/schedulers/QueueNotificationService");

// set express port
app.set("PORT", process.env.PORT);

app.listen(app.get("PORT"), () => {
	console.log(`Server is running at port:${process.env.PORT}`);
});
