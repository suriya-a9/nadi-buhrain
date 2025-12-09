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
const accountTypeRouter = require("./modules/user/accountType/account.routes");
const roadRouter = require("./modules/user/road/road.routes");
const blockRouter = require("./modules/user/block/block.routes");
const userAccountRouter = require("./modules/userAccount/userAccount.routes");
const termsRouter = require("./modules/adminPanel/termsAndCondition/terms.routes");
const accountVerificationRouter = require("./modules/adminPanel/accountVerification/accountVerification.routes");
const pointsRouter = require("./modules/adminPanel/points/points.routes");
const issueRouter = require("./modules/issue/issue.routes");
const userServiceRouter = require("./modules/user/userService/userService.routes");
const userServiceAdminSideRouter = require("./modules/adminPanel/userService/userServiceRoutes.routes");
const technicalSkillSetRouter = require("./modules/adminPanel/technicianSkillSet/technicianSkillSet.routes");
const technicianRouter = require("./modules/adminPanel/technician/technician.routes");
const technicianPanelRouter = require("./modules/technician/technician.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

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
app.use("/api/intro", introRouter);
app.use("/api/account-type", accountTypeRouter);
app.use("/api/road", roadRouter);
app.use("/api/block", blockRouter);
app.use("/api/user-account", userAccountRouter);
app.use("/api/account-verify", accountVerificationRouter);
app.use("/api/terms", termsRouter);
app.use("/api/points", pointsRouter);
app.use("/api/issue", issueRouter);
app.use("/api/user-service", userServiceRouter);
app.use("/api/user-service-list", userServiceAdminSideRouter);
app.use("/api/technical", technicalSkillSetRouter);
app.use("/api/technician", technicianRouter);
app.use("/api/techie", technicianPanelRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "internal server error",
  });
});

const port = config.port || 5000;
app.listen(port, () => logger.info(`Server running at ${port}`));