require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const cors = require("./middlewares/cors");
const handlerError = require("./middlewares/handlerError");
const rateLimiter = require("./middlewares/rateLimiter");
const routes = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");
// console.log('process.env.MONGO_URI:', process.env.MONGO_URI);
// console.log('process.env.MONGO_ROOT_USERNAME:', process.env.MONGO_ROOT_USERNAME);
// console.log('process.env.MONGO_ROOT_PASSWORD:', process.env.MONGO_ROOT_PASSWORD);
const { MONGO_URI } = process.env;
const { PORT = 4000, DBlink = MONGO_URI } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cors);

app.use(requestLogger);
app.use(rateLimiter);
app.use("/", routes);
app.use(errorLogger);

app.use(errors());
app.use(handlerError);

mongoose.connect(DBlink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
