import Battle from "../Models/Battle";
import { IncludeOptions, Op } from "sequelize";
import War from "../Models/War";

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

        const wars = await War.findAll({ attributes: ["name", "id"] });
        filters.place = places.map((el: any) => el?.place);
        filters.war = wars.map((el: any) => ({ name: el.name, id: el.id }));

        return filters;
    }

    public async getAndFilter(filters: any, search: string) {
        let where: any = {};
        if (search) {
            where.name = {
                [Op.like]: `%${search}%`,
            };
        }

        for (let filter in filters) {
            where[filter] = { [Op.in]: filters[filter] };
        }

        const battles = await Battle.findAll({
            where,
            include,
        });
        return battles;
    }
}

export default new BattleService();
