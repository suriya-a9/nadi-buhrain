require("dotenv").config();
const express = require("express");
const app = express();
const config = require("./config/default");
const logger = require("./logger");
const connectDb = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const serviceRouter = require("./modules/service/service.routes");
const adminRouter = require("./modules/admin/admin.routes");
const loadingRouter = require("./modules/user/loadingScreen/loading.routes");
const introRouter = require("./modules/user/introScreen/intro.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Request limit reached. Please try again later.",
});

app.use(limiter);

connectDb();

app.use("/api/admin", adminRouter);
app.use("/api/user/loading", loadingRouter);
app.use("/api/service", serviceRouter);
app.use("/api/intro", introRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "internal server error",
  });
});

const port = config.port || 5000;
app.listen(port, () => logger.info(`Server running at ${port}`));