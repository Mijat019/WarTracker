import { Model, INTEGER, STRING, DATE } from "sequelize";
import sequelize from "./database";

class MilitaryLeader extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public dateOfBirth!: Date;
  public dateOfDeath!: Date;
  public birthPlace!: string;
  public militaryRank!: string;
  public title!: string;
  public dynastyName!: string;
  public school!: string;
  public imageUrl!: string;
}

MilitaryLeader.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DATE,
      allowNull: false,
    },
    dateOfDeath: {
      type: DATE,
      allowNull: true,
    },
    militaryRank: {
      type: STRING,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: true,
    },
    dynastyName: {
      type: STRING,
      allowNull: true,
    },
    school: {
      type: STRING,
      allowNull: false,
    },

    imageUrl: {
      type: STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "militaryleader", timestamps: false }
);

export default MilitaryLeader;
