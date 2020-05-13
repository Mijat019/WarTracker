import { Model, INTEGER, DECIMAL } from "sequelize";
import sequelize from "./database";
import Map from "./Map";
import Battle from "./Battle";

class BattleMapPosition extends Model {
  public id!: number;
  public mapId!: number;
  public battleId!: number;
  public lng!: number;
  public lat!: number;
}

BattleMapPosition.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },

    lng: {
      type: DECIMAL,
      allowNull: false,
    },

    lat: {
      type: DECIMAL,
      allowNull: false,
    },

    mapId: {
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
    tableName: "battleMapPosition",
    timestamps: true,
    indexes: [{ unique: true, fields: ["mapId", "battleId"] }],
  }
);

BattleMapPosition.belongsTo(Map, { as: "map", foreignKey: "mapId" });
BattleMapPosition.belongsTo(Battle, { as: "battle", foreignKey: "battleId" });

export default BattleMapPosition;
