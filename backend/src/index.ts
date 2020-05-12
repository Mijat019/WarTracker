import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import sequelize from "./Models/database";
import initModel from "./Models/initModel";

import militaryLeaderRoutes from "./Routes/militaryLeaderRoutes";
import warRoutes from "./Routes/warRoutes";
import militaryLeaderWarRoutes from "./Routes/militaryLeaderWarRoutes";
import battlesRoutes from "./Routes/battleRoutes";

(async () => {
  try {
    await sequelize.authenticate();
    /*
      To apply changes to the database schema, you need to 
      uncomment next two lines
    */
    await sequelize.sync({ force: true });
    await initModel();
    console.log("Connected to the database.");
  } catch (error) {
    console.log(error);
  }
})();

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/militaryLeaders", militaryLeaderRoutes);
app.use("/war", warRoutes);
app.use("/militaryLeaderWar", militaryLeaderWarRoutes);
app.use("/battles", battlesRoutes);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
