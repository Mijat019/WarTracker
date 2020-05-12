import MilitaryLeaderWar from "../Models/MilitaryLeaderWar";
import { IncludeOptions } from "sequelize/types";
import War from "../Models/War";
import MilitaryLeader from "../Models/MilitaryLeader";

const include: IncludeOptions[] = [
  { model: War, as: "war", required: true },
  { model: MilitaryLeader, as: "militaryLeader", required: true },
];
const attributes: string[] = ["id"];

class MilitaryLeaderWarController {
  public async getAll() {
    const militaryLeaderWars = await MilitaryLeaderWar.findAll({
      include,
      attributes,
    });
    return militaryLeaderWars;
  }

  public async add(militaryLeaderWarPayload: any) {
    const { militaryLeaderId, warId } = await MilitaryLeaderWar.create(
      militaryLeaderWarPayload
    );
    const militaryLeaderWar = await MilitaryLeaderWar.findOne({
      where: { militaryLeaderId, warId },
      include,
      attributes,
    });
    return militaryLeaderWar;
  }

  public async delete(id: string) {
    await MilitaryLeaderWar.destroy({ where: { id } });
  }
}

export default new MilitaryLeaderWarController();
