import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import sequelize from "./Models/database";
import militaryLeaderRoutes from "./Routes/militaryLeaderRoutes";
import initModel from "./Models/initModel";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await initModel();
    console.log("Connected to the database.");
  } catch (error) {
    console.log(error);
  }
})();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/militaryLeaders", militaryLeaderRoutes);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
