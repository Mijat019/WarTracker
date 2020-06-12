import MilitaryLeaderMapPosition from "../Models/MilitaryLeaderMapPosition";
import { IncludeOptions } from "sequelize/types";
import MilitaryLeader from "../Models/MilitaryLeader";
import Map from "../Models/Map";
import BattleMapPosition from "../Models/BattleMapPosition";
import Battle from "../Models/Battle";

const include: IncludeOptions[] = [
  { model: MilitaryLeader, as: "militaryLeader", required: true },
  { model: Map, as: "map", required: true },
];

const attributes: string[] = ["id", "lng", "lat"];

class MilitaryLeaderMapPositionService {
  public async getAll() {
    const militaryLeaderMapPositions = await MilitaryLeaderMapPosition.findAll({
      include,
      attributes,
    });
    return militaryLeaderMapPositions;
  }

  public async getAllForMap(mapId: string) {
    const militaryLeaderMapPositions = await MilitaryLeaderMapPosition.findAll({
      where: { mapId },
      include,
      attributes,
    });
    return militaryLeaderMapPositions;
  }

  public async getAllForMapByName(mapName: string) {
    const militaryLeaderMapPositions = await MilitaryLeaderMapPosition.findAll({
      where: { '$map.name$': mapName },
      include,
      attributes
    });
    return militaryLeaderMapPositions;
  }

  public async add(militaryLeaderMapPositionPayload: any) {
    const { id } = await MilitaryLeaderMapPosition.create(
      militaryLeaderMapPositionPayload
    );
    const militaryLeaderMapPosition = MilitaryLeaderMapPosition.findByPk(id, {
      include,
      attributes,
    });
    return militaryLeaderMapPosition;
  }

  public async update(id: string, militaryLeaderMapPositionUpdate: any) {
    const toUpdate = {
      lng: militaryLeaderMapPositionUpdate.lng,
      lat: militaryLeaderMapPositionUpdate.lat
    };
    await MilitaryLeaderMapPosition.update(toUpdate, {
      where: { militaryLeaderId: militaryLeaderMapPositionUpdate.militaryLeader.id },
    });
    const militaryLeaderMapPosition = MilitaryLeaderMapPosition.findByPk(id, {
      include,
      attributes,
    });
    return militaryLeaderMapPosition;
  }

  public async delete(id: string) {
    await MilitaryLeaderMapPosition.destroy({
      where: { id },
    });
  }

  public async exists(militaryLeaderId: string, mapId: string) {
    const count = await MilitaryLeaderMapPosition.count({
      where: {militaryLeaderId, mapId}});
    return !!count;
  }

  public async findOne(militaryLeaderId: string) {
    const found = await MilitaryLeaderMapPosition.findOne({
      where: {
        militaryLeaderId,
      },
      include: [{ model: MilitaryLeader, as: "militaryLeader", required: true }],
      attributes
    });
    return found;
  }

  public async updateAll(militaryLeaderMapPosition: any) {
    await MilitaryLeaderMapPosition.update(militaryLeaderMapPosition, {
      where: {
        militaryLeaderId: militaryLeaderMapPosition.militaryLeaderId
      }
    })
  }
}

export default new MilitaryLeaderMapPositionService();
