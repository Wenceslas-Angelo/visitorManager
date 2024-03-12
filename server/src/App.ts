import dotEnv from "dotenv";
import express from "express";
import dbConnection from "./utils/dbConnection";
import cors from "cors";
import UserRouter from "./routers/User";

dotEnv.config();
const App = express();

App.use(express.json());
App.use(cors());

dbConnection();

App.use("/auth", UserRouter);

export default App;
