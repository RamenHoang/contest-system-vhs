const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const AsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const Jwt = require("../config/jwt");
const User = require("../models/User");
const ApiError = require("./error/ApiError");
const ApiResponse = require("./response/ApiResponse");

const loginGoogle = AsyncHandler(async (req, res, next) => {
  try {
    const { token } = req.body;
    //auth o2 google
    if (!token) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.BAD_REQUEST, "Invalid token.")
      );
    }

    const userGoogle = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { email, name, picture } = userGoogle.data;
    //check if user exist by email
    let userExist = await User.findOne({
      where: { email: email, isDeleted: false },
    });

    console.log(userExist);

    if (!userExist) {
      userExist = new User({
        username: name,
        email: email,
        avatar: picture,
      });
    }

    const accessToken = Jwt.generateAccessToken(userExist);
    const refreshToken = Jwt.generateRefreshToken(userExist);

    userExist.refreshToken = refreshToken;
    await userExist.save();

    const responseData = {
      id: userExist.id,
      email: userExist.email,
      username: userExist.username,
      accessToken: accessToken,
      refreshToken: refreshToken,
      avatar: userExist.avatar,
      role: userExist.role,
    };

    res.status(StatusCodes.OK).json(ApiResponse(responseData));
  } catch (error) {
    console.log("Error:" + error);
    next(error);
  }
});

/**
 * @desc authenticate user (login)
 * @route GET /api/users/login
 * @access public
 */
const login = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // find user from database
  const user = await User.findOne({
    where: { username: username, isDeleted: false },
  });
  const authenticate = user && (await bcrypt.compare(password, user.password));

  if (!authenticate) {
    throw new ApiError(
      ApiResponse(
        { credentials: { username, password } },
        0,
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials provided."
      )
    );
  }

  const refreshToken = Jwt.generateRefreshToken(user);
  user.refreshToken = refreshToken;

  await user.save();

  const responseData = {
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: Jwt.generateAccessToken(user),
    refreshToken: refreshToken,
    avatar: user.avatar,
    role: user.role,
  };

  res.status(StatusCodes.OK).json(ApiResponse(responseData));
});

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.BAD_REQUEST, "Invalid token.")
      );
    }

    const user = await User.findOne({ where: { refreshToken: refreshToken } });

    if (!user) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.UNAUTHORIZED, "Invalid token.")
      );
    }

    user.refreshToken = null;
    await user.save();

    res.status(StatusCodes.OK).json(ApiResponse(true));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc get currently authenticated user (login)
 * @route GET /api/users/me
 * @access private
 */
const getCurrentUser = AsyncHandler(async (req, res) => {
  const responseData = req.user;

  res
    .status(StatusCodes.OK)
    .json(ApiResponse("Current user data.", { user: responseData }));
});

module.exports = {
  loginGoogle,
  login,
  logout,
  getCurrentUser,
};
