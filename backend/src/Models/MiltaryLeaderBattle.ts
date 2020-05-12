import { Model, INTEGER } from "sequelize";
import sequelize from "./database";
import Battle from "./Battle";
import MilitaryLeader from "./MilitaryLeader";

class MilitaryLeaderBattle extends Model {
  public id!: number;
  public militaryLeaderId!: number;
  public battleId!: number;
}

MilitaryLeaderBattle.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },

    militaryLeaderId: {
      type: INTEGER,
      allowNull: false,
    },

    battleId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "militaryLeaderBattle",
    timestamps: false,
    indexes: [{ unique: true, fields: ["militaryLeaderId", "battleId"] }],
  }
);

MilitaryLeaderBattle.belongsTo(Battle, {
  as: "battle",
  foreignKey: "battleId",
});
MilitaryLeaderBattle.belongsTo(MilitaryLeader, {
  as: "militaryLeader",
  foreignKey: "militaryLeaderId",
});

export default MilitaryLeaderBattle;
