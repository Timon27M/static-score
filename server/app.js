const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const cors = require("./middlewares/cors");
const handlerError = require("./middlewares/handlerError");
const rateLimiter = require("./middlewares/rateLimiter");
const routes = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");

// mongodb://root:example@mongo:27017/
// mongodb://127.0.0.1:27017/
const { PORT = 4000, DBlink = process.env.MONGO_URI } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cors);

app.use(requestLogger);
app.use(rateLimiter);
app.use("/", routes);
app.use(errorLogger);

app.use(errors());
app.use(handlerError);

mongoose.connect(DBlink);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
