const userRouter = require("express").Router();
const auth = require("../middleware/auth");
const userControl = require("../controllers/userControl");
userRouter.get("/", auth, userControl.getUser);
module.exports = userRouter;
