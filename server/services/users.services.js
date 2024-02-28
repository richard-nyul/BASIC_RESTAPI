import { User } from "../models/User.js";

export const findUser = async (username) => {
  const user = await User.findOne({
    username,
  });
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};
