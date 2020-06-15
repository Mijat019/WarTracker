import BattleMapPosition from "../Models/BattleMapPosition";
import { IncludeOptions, Op } from "sequelize";
import Map from "../Models/Map";
import Battle from "../Models/Battle";

const include: IncludeOptions[] = [
    { model: Map, as: "map", required: true },
    { model: Battle, as: "battle", required: true },
];

const attributes: string[] = ["id", "lng", "lat"];

class BattleMapPositionService {
    public async getAll() {
        const battleMapPositions = await BattleMapPosition.findAll({
            include,
            attributes,
        });
        return battleMapPositions;
    }

    public async getAllForMap(mapId: string) {
        const battleMapPositions = await BattleMapPosition.findAll({
            where: { mapId },
            include,
            attributes,
        });
        return battleMapPositions;
    }

    public async getAllForMapName(mapName: string) {
        const battleMapPositions = await BattleMapPosition.findAll({
            where: { "$map.name$": mapName },
            include,
            attributes,
        });
        return battleMapPositions;
    }

    public async add(battleMapPositionPayload: any) {
        const { id } = await BattleMapPosition.create(battleMapPositionPayload);
        const battleMapPosition = await BattleMapPosition.findByPk(id, {
            include,
            attributes,
        });
        return battleMapPosition;
    }

    public async update(id: string, battleMapPositionUpdate: any) {
        // posto abdejtujemo samo lng i lat, idemo ovako

        const toUpdate = {
            lng: battleMapPositionUpdate.lng,
            lat: battleMapPositionUpdate.lat,
        };

        await BattleMapPosition.update(toUpdate, {
            where: { battleId: battleMapPositionUpdate.battle.id },
        });

        const updatedBattleMapPosition = await BattleMapPosition.findByPk(id, {
            include,
            attributes,
        });
        console.log(updatedBattleMapPosition);
        return updatedBattleMapPosition;
    }

    public async delete(id: string) {
        await BattleMapPosition.destroy({ where: { id } });
    }

    public async findOne(battleId: string) {
        const found = await BattleMapPosition.findOne({
            where: { battleId },
            include: [{ model: Battle, as: "battle", required: true }],
            attributes,
        });
        return found;
    }

    public async exists(battleId: string, mapId: string) {
        const count = await BattleMapPosition.count({
            where: { battleId, mapId },
        });
        return !!count;
    }

    public async updateAll(battleMapPosition: any) {
        await BattleMapPosition.update(battleMapPosition, {
            where: {
                battleId: battleMapPosition.battleId,
            },
        });
    }

    public async getAndFilter(mapId: any, filters: any, search: any) {
        let where: any = {};

        if (search) {
            where[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
        }

        for (let filter in filters) {
            where[filter] = { [Op.in]: filters[filter] };
        }

        const res = await BattleMapPosition.findAll({
            where: { mapId },
            include: [{ model: Battle, as: "battle", where, required: true }],
        });

        return res;
    }
}

export default new BattleMapPositionService();
