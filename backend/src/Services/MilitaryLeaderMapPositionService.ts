import MilitaryLeaderMapPosition from "../Models/MilitaryLeaderMapPosition";
import { IncludeOptions } from "sequelize/types";
import MilitaryLeader from "../Models/MilitaryLeader";
import Map from "../Models/Map";

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
    await MilitaryLeaderMapPosition.update(militaryLeaderMapPositionUpdate, {
      where: { id },
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
}

export default new MilitaryLeaderMapPositionService();
