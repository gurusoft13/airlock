const models = require("../models");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    const { User } = models;
    const user = await User.findOne({
      where: { access_code: decodedToken.access_code },
      attributes: ["room_name", "user_name", "access_code"],
    });

    if (user) {
      console.log("middleware : AUTH : SUCCESS! ");
      next();
    } else throw "Invalid token";
  } catch {
    console.log("middleware : AUTH : FAILED! ");
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
