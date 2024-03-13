import cors from "cors";
import dotEnv from "dotenv";
import express from "express";
import UserRouter from "./routers/User";
import VisitorRouter from "./routers/Visitor";
import dbConnection from "./utils/dbConnection";

dotEnv.config();
const App = express();

App.use(express.json());
App.use(cors());

dbConnection();

App.use("/auth", UserRouter);
App.use("/visitor", VisitorRouter);

export default App;
