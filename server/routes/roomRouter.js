const roomRouter = require("express").Router();
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");
roomRouter.post("/", roomControl.createRoom);
roomRouter.delete("/", roomControl.deleteRoom);
module.exports = roomRouter;
