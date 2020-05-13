import BattleMapPosition from "../Models/BattleMapPosition";
import { IncludeOptions } from "sequelize/types";
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

  public async add(battleMapPositionPayload: any) {
    const { id } = await BattleMapPosition.create(battleMapPositionPayload);
    const battleMapPosition = await BattleMapPosition.findByPk(id, {
      include,
      attributes,
    });
    return battleMapPosition;
  }

  public async update(id: string, battleMapPositionUpdate: any) {
    await BattleMapPosition.update(battleMapPositionUpdate, { where: { id } });
    const updatedBattleMapPosition = await BattleMapPosition.findByPk(id, {
      include,
      attributes,
    });
    return updatedBattleMapPosition;
  }

  public async delete(id: string) {
    await BattleMapPosition.destroy({ where: { id } });
  }
}

export default new BattleMapPositionService();
