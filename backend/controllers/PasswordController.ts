import express from "express";
import { StatusCodes } from "http-status-codes";
import Subscriptions from "../models/SubscriptionModel";
import Users from "../models/UserModel";
import * as CustomError from "../errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendPasswordEmail } from "../libs/mailer";

type IUser = {
  _id: string;
  email: string;
  username: string;
  wallets: string[];
  verified: boolean;
  save: () => void;
}[];

export const requestLink = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  const user: IUser | any = await Users.findOne({
    email,
  });

  if (user) {
    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    const payload = {
      email,
      id: user._id,
    };
    //create one time link valid for 15 minutes (backend link)
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `${process.env.BASE_URL_PROD}/forgot-password/${user._id}/${token}`;

    //send link to user
    await sendPasswordEmail({ to: email, username: user.username, link });
    console.log(link);
    res.status(StatusCodes.OK).json({ msg: "Link sent" });
  } else {
    throw new CustomError.BadRequestError("Email does not exist");
  }
};

export const verifyLink = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, token } = req.params;
  const user: IUser | any = await Users.findOne({
    _id: id,
  });

  if (!user) {
    throw new CustomError.BadRequestError("Invalid credentials");
  }
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

  //validate jwt
  try {
    jwt.verify(token, secret);
    const newToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    //redirect to front end
    res.cookie("token", newToken, { httpOnly: true, secure: true });
    res.redirect(`https://www.gamer-hub.io/reset-password`);
  } catch (error) {
    //redirect to frontend with error message
    res.cookie("error", error.message, { httpOnly: true, secure: true });
    res.redirect(`https://www.gamer-hub.io/reset-password`);
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { password, token } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      id: string;
    };

    // Fetch the user from the database
    const user: IUser | any = await Users.findOne({ _id: decoded.id });
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }

    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Send a success response
    res.status(StatusCodes.OK).json({ msg: "Password successfully changed" });
  } catch (error) {
    // Handle errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid or expired token" });
    }
    if (error instanceof CustomError.NotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
    }

    console.error("Error resetting password:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
