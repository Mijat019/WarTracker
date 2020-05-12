import { Model, INTEGER, STRING } from "sequelize";
import sequelize from "./database";

class Map extends Model {
  public id!: number;
  public name!: string;
}

Map.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, tableName: "map", timestamps: true }
);

export default Map;
