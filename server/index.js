import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connection from "./Database/db.js";
import router from "./Routes/routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;

connection(Username, Password);
