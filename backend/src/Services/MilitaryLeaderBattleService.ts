import MilitaryLeaderBattle from "../Models/MiltaryLeaderBattle";
import { IncludeOptions } from "sequelize/types";
import { Op } from "sequelize";
import Battle from "../Models/Battle";
import MilitaryLeader from "../Models/MilitaryLeader";
import sequelize from "../Models/database"
import Map from "../Models/Map";

class MilitaryLeaderBattleService {
  public async getAll() {
    const militaryLeaderBattles = await MilitaryLeaderBattle.findAll();
    return militaryLeaderBattles;
  }

  public async add(militaryLeaderBattlePayload: any) {
    const { id } = await MilitaryLeaderBattle.create(
      militaryLeaderBattlePayload
    );
    const militaryLeaderBattle = await MilitaryLeaderBattle.findByPk(id);
    return militaryLeaderBattle;
  }

  public async delete(id: string) {
    await MilitaryLeaderBattle.destroy({ where: { id } });
  }

  /*
   *
   *  Radi se sljedeci query za mapId = 1
   *  SELECT `id`, `militaryLeaderId`, `battleId` FROM `militaryLeaderBattle` AS `MilitaryLeaderBattle`
   *  WHERE `MilitaryLeaderBattle`.`battleId` IN
   *    (SELECT `id` FROM `battleMapPosition` WHERE `battleMapPosition`.`mapId` = '1')
   *  AND `MilitaryLeaderBattle`.`militaryLeaderId` IN
 *      (SELECT `id` FROM `militaryLeaderMapPosition` WHERE `militaryLeaderMapPosition`.`mapId` = '1')
   *
   *
   */
  public async getAllForMap(mapId: string) {
    // @ts-ignore
    const fromBattlePosition = sequelize.getQueryInterface().QueryGenerator
        .selectQuery('battleMapPosition', {
          attributes: ['id'],
          where: {
            mapId
          }
        }).slice(0, -1);
    // @ts-ignore
    const fromMilitaryLeaderPosition = sequelize.getQueryInterface().QueryGenerator
        .selectQuery('militaryLeaderMapPosition', {
          attributes: ['id'],
          where: {
            mapId
          }
        }).slice(0, -1);

    const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
      where: {
        battleId: {
          [Op.in]: sequelize.Sequelize.literal(`(${fromBattlePosition})`)
        },
        militaryLeaderId: {
          [Op.in]: sequelize.Sequelize.literal(`(${fromMilitaryLeaderPosition})`)
        }
      }
    });
    return militaryLeaderBattles;
  }
}

export default new MilitaryLeaderBattleService();
