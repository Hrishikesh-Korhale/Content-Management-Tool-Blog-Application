import express from "express";
import dotenv from "dotenv";

import connection from "./Database/db.js";

dotenv.config();

const app = express();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;

connection(Username, Password);
