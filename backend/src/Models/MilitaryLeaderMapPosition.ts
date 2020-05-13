import { Model, DECIMAL, INTEGER } from "sequelize";
import sequelize from "./database";
import MilitaryLeader from "./MilitaryLeader";
import Map from "./Map";

class MilitaryLeaderMapPosition extends Model {
  public id!: number;
  public mapId!: number;
  public militaryLeaderId!: number;
  public lng!: number;
  public lat!: number;
}

MilitaryLeaderMapPosition.init(
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

    militaryLeaderId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "militaryLeaderMapPosition",
    timestamps: true,
    indexes: [{ unique: true, fields: ["mapId", "militaryLeaderId"] }],
  }
);

MilitaryLeaderMapPosition.belongsTo(Map, { as: "map", foreignKey: "mapId" });
MilitaryLeaderMapPosition.belongsTo(MilitaryLeader, {
  as: "militaryLeader",
  foreignKey: "militaryLeaderId",
});

export default MilitaryLeaderMapPosition;
