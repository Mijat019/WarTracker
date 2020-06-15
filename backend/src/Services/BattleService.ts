import Battle from "../Models/Battle";
import { IncludeOptions } from "sequelize/types";
import War from "../Models/War";
import sequelize from "../Models/database"

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

  public async search(nameQuery: string) {
    const s = sequelize.Sequelize;
    const battles = await Battle.findAll({
      where: {
        name: s.where(s.fn('LOWER', s.col('Battle.name')), 'LIKE', '%' + nameQuery + '%')
      },
      include, attributes
    });
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
}

export default new BattleService();
