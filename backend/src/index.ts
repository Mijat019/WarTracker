import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
