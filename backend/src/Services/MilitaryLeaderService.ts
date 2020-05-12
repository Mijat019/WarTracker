import MilitaryLeader from "../Models/MilitaryLeader";

class MilitaryLeaderService {
  public async getAll() {
    const militaryLeaders = await MilitaryLeader.findAll();
    return militaryLeaders;
  }
  public async add(militaryLeadersPayload: any) {
    const militaryLeader = await MilitaryLeader.create(militaryLeadersPayload);
    return militaryLeader;
  }
  public async update(id: string, militaryLeaderUpdate: any) {
    await MilitaryLeader.update(militaryLeaderUpdate, { where: { id } });
    const updatedMilitaryLeader = await MilitaryLeader.findByPk(id);
    return updatedMilitaryLeader;
  }
  public async delete(id: string) {
    await MilitaryLeader.destroy({ where: { id } });
  }
}
export default new MilitaryLeaderService();
