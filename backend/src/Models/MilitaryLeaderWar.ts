import { Model, INTEGER } from "sequelize";
import sequelize from "./database";
import War from "./War";
import MilitaryLeader from "./MilitaryLeader";

class MilitaryLeaderWar extends Model {
  public id!: number;
  public militaryLeaderId!: number;
  public warId!: number;
}

MilitaryLeaderWar.init(
  {
    id: {
      type: INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    militaryLeaderId: {
      type: INTEGER,
      allowNull: false,
    },

    warId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "militaryLeaderWar",
    timestamps: false,
    indexes: [{ unique: true, fields: ["militaryLeaderId", "warId"] }],
  }
);

MilitaryLeaderWar.belongsTo(War, { as: "war", foreignKey: "warId" });
MilitaryLeaderWar.belongsTo(MilitaryLeader, {
  as: "militaryLeader",
  foreignKey: "militaryLeaderId",
});

export default MilitaryLeaderWar;
