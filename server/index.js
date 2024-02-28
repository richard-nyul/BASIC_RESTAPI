import usersRouter from "./routes/users.routes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://test_user2024:XYLoNW9RXTFN64Ec@cluster0.pcz4aly.mongodb.net/users_db?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
