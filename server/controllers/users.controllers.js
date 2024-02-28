import { getAllUsers, findUser } from "../services/users.services.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// JWT token

const JWT_SECRET =
  "7f406b0da7ea8bba582c268d3aa430cdc651884235075ed74ba46f9fa4ada1253f9a40";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(username);
    if (!user) {
      return res.status(401).json({ message: "Failed to login" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Failed to login" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to login");
  }
};

export const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization token" });
    }

    // Getting to token from "Bearer token"
    const tokenValue = token.split(" ")[1];

    // Verification of the token
    try {
      const decoded = jwt.verify(tokenValue, JWT_SECRET);
      if (decoded) {
        const users = await getAllUsers();
        res.status(200).json(users);
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
