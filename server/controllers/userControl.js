const jwt = require("jsonwebtoken");
const models = require("../models");
const HttpStatus = require("http-status-codes");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const TWILIO_ROOM_NAME = "squareparty";
/**
 *
 * Returns token for user with passcode
 * - user not exist => 404 {type: 'USER_NOT_FOUND'}
 *
 * @method POST
 * @param { passcode: ''}
 * @return { token: string }
 */
const login = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    const { User, Room } = models;
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ["name", "access_code", "room_name"],
    });

    if (!user) {
      // user not exist => 404 {type: 'USER_NOT_FOUND'}
      res.status(HttpStatus.NOT_FOUND).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    // const userData = {
    //   access_code: user.access_code,
    // };

    // // generate token
    // const token = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
    //   expiresIn: "24h",
    // });
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    );
    const videoGrant = new VideoGrant({ room: TWILIO_ROOM_NAME });
    token.identity = user.name;
    token.addGrant(videoGrant);

    console.log(`TOKEN GENERATED => ${token} for ${user.name}`);

    const sendData = {
      access_code: user.access_code,
      identity: user.name,
      token: token.toJwt(),
    };

    const jwtToken = jwt.sign(sendData, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("airlock_token", jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log("cookie created successfully");
    res.send(sendData);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * Returns user data for corresponding user for accesscode
 * - user not found => 401 { type: 'USER_NOT_FOUND' }
 * - if user don't have room, returns room filed as null
 *
 * @method GET
 * @param
 * @return {* user: {}, room: {} }
 * @description user => { access_code: string, name: string, my_room_name: string}
 * @description room => { name: string, owner_access_code: string, mode: string, members: string, isOwner: boolean}
 */
const checkAuth = async (req, res, next) => {
  try {
    const user = req.auth_user;
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    );
    const videoGrant = new VideoGrant({ room: TWILIO_ROOM_NAME });
    token.identity = user.name;
    token.addGrant(videoGrant);

    console.log(`TOKEN GENERATED => ${token} for ${user.name}`);

    const sendData = {
      access_code: user.access_code,
      identity: user.name,
      token: token.toJwt(),
    };

    const jwtToken = jwt.sign(sendData, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("airlock_token", jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log("cookie created successfully");
    res.send(sendData);
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

module.exports = { login, checkAuth };
