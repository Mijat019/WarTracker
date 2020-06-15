import Battle from "../Models/Battle";
import { IncludeOptions } from "sequelize/types";
import War from "../Models/War";
import sequelize from "../Models/database";

const include: IncludeOptions[] = [{ model: War, as: "war", required: true }];
const attributes: string[] = [
    "id",
    "date",
    "name",
    "place",
    "iconUrl",
    "description",
];

class BattleService {
    public async getAll() {
        const battles = await Battle.findAll({ include, attributes });
        return battles;
    }

    public async add(battlePayload: any) {
        const battle = await Battle.create(battlePayload);
        return battle;
    }

    public async update(id: string, battleUpdate: any) {
        await Battle.update(battleUpdate, { where: { id } });
        const updatedBattle = await Battle.findByPk(id);
        return updatedBattle;
    }

    public async delete(id: string) {
        await Battle.destroy({ where: { id } });
    }

    public async getFilters() {
        let filters: any = {};
        const places = await Battle.findAll({
            attributes: ["place"],
            group: "place",
        });

        const wars = await War.findAll({ attributes: ["name"] });
        filters.place = places.map((el: any) => el?.place);
        filters.war = wars.map((el: any) => el.name);

        return filters;
    }
}

export default new BattleService();
