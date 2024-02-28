import * as usersController from "../controllers/users.controllers.js";
import express from "express";
const router = express.Router();

router.get("/getUsers", usersController.getUsers);

router.post("/login", usersController.login);

export default router;
