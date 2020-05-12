import { Model, INTEGER, STRING } from "sequelize";
import sequelize from "./database";

class War extends Model {
  public id!: number;
  public name!: string;
}

War.init(
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
    },
  },
  { sequelize, tableName: "war", timestamps: false }
);

export default War;
