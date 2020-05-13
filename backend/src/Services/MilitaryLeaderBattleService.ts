import MilitaryLeaderBattle from "../Models/MiltaryLeaderBattle";
import { IncludeOptions } from "sequelize/types";
import Battle from "../Models/Battle";
import MilitaryLeader from "../Models/MilitaryLeader";

const include: IncludeOptions[] = [
  { model: Battle, as: "battle", required: true },
  { model: MilitaryLeader, as: "militaryLeader", required: true },
];

const attributes: string[] = ["id"];

class MilitaryLeaderBattleService {
  public async getAll() {
    const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
      include,
      attributes,
    });
    return militaryLeaderBattles;
  }

  public async add(militaryLeaderBattlePayload: any) {
    const { id } = await MilitaryLeaderBattle.create(
      militaryLeaderBattlePayload
    );
    const militaryLeaderBattle = await MilitaryLeaderBattle.findByPk(id, {
      include,
      attributes,
    });
    return militaryLeaderBattle;
  }

  public async delete(id: string) {
    await MilitaryLeaderBattle.destroy({ where: { id } });
  }
}

export default new MilitaryLeaderBattleService();
