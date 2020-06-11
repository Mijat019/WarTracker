import MilitaryLeaderBattle from "../Models/MiltaryLeaderBattle";
import {col, IncludeOptions} from "sequelize/types";
import { Op } from "sequelize";
import Battle from "../Models/Battle";
import MilitaryLeader from "../Models/MilitaryLeader";
import sequelize from "../Models/database"
import Map from "../Models/Map";

const attributes: string[] = ["id", "battleId", "militaryLeaderId"];

class MilitaryLeaderBattleService {
  public async getAll() {
    const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
        attributes
    });
    return militaryLeaderBattles;
  }

  public async add(militaryLeaderBattlePayload: any) {
    const { id } = await MilitaryLeaderBattle.create(
      militaryLeaderBattlePayload
    );
    const militaryLeaderBattle = await MilitaryLeaderBattle.findByPk(id, {
        attributes
    });
    return militaryLeaderBattle;
  }

  public async delete(id: string) {
    await MilitaryLeaderBattle.destroy({ where: { id } });
  }

  public async exists(id: string) {
      const count = await MilitaryLeaderBattle.count({ where: { id } });
      return !!count;
  }

  /*
   *
   *  Radi se sljedeci query za mapId = 1
   *  SELECT `id`, `militaryLeaderId`, `battleId` FROM `militaryLeaderBattle` AS `MilitaryLeaderBattle`
   *  WHERE `MilitaryLeaderBattle`.`battleId` IN
   *    (SELECT `id` FROM `battleMapPosition` WHERE `battleMapPosition`.`mapId` = '1')
   *  AND `MilitaryLeaderBattle`.`militaryLeaderId` IN
   *    (SELECT `id` FROM `militaryLeaderMapPosition` WHERE `militaryLeaderMapPosition`.`mapId` = '1')
   *
   *
   */
  public async getAllForMap(mapId: string) {
    const fromBattlePosition = this.getPosition(mapId, 'battleMapPosition', 'battleId');
    const fromMilitaryLeaderPosition = this.getPosition(mapId, 'militaryLeaderMapPosition', 'militaryLeaderId');

    const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
      where: {
        battleId: {
          [Op.in]: sequelize.Sequelize.literal(`(${fromBattlePosition})`)
        },
        militaryLeaderId: {
          [Op.in]: sequelize.Sequelize.literal(`(${fromMilitaryLeaderPosition})`)
        },
      },
      attributes
    });

    return militaryLeaderBattles;
  }

    public async additionalMilitaryLeader(mapId: string,  militaryLeaderId: string) {
        const fromBattlePosition = this.getPosition(mapId, 'battleMapPosition', 'battleId');

        const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
            where: {
                battleId: {
                    [Op.in]: sequelize.Sequelize.literal(`(${fromBattlePosition})`)
                },
                militaryLeaderId
            },
            attributes
        });
        return militaryLeaderBattles;
    }

    public async additionalBattle(mapId: string,  battleId: string) {
        const fromMilitaryLeaderPosition = this.getPosition(mapId, 'militaryLeaderMapPosition', 'militaryLeaderId');

        const militaryLeaderBattles = await MilitaryLeaderBattle.findAll({
            where: {
                battleId,
                militaryLeaderId: {
                    [Op.in]: sequelize.Sequelize.literal(`(${fromMilitaryLeaderPosition})`)
                }
            },
            attributes
        });
        return militaryLeaderBattles;
    }

    private getPosition(mapId: string, table: string, column: string) {
        // @ts-ignore
        return sequelize.getQueryInterface().QueryGenerator
                .selectQuery(table, {
                    attributes: [column],
                    where: {
                        mapId
                    }
                }).slice(0, -1);
    }
}

export default new MilitaryLeaderBattleService();
