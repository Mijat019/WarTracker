import { Model, INTEGER, STRING, DATE } from "sequelize";
import sequelize from "./database";
import War from "./War";

class Battle extends Model {
    public id!: number;
    public name!: string;
    public date!: Date;
    public place!: string;
    public iconUrl!: string;
    public description!: string;
    public warId!: number;
}

Battle.init(
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

        date: {
            type: DATE,
            allowNull: false,
        },

        place: {
            type: STRING,
            allowNull: true,
        },

        iconUrl: {
            type: STRING,
            allowNull: true,
        },

        description: {
            type: STRING,
            allowNull: true,
        },

        warId: {
            type: INTEGER,
            allowNull: false,
        },
    },
    { sequelize, tableName: "battle", timestamps: false }
);

Battle.belongsTo(War, { as: "war", foreignKey: "warId" });

export default Battle;
