import dotEnv from "dotenv";
import express from "express";
import dbConnection from "./utils/dbConnection";

dotEnv.config();
const App = express();

dbConnection();

export default App;
