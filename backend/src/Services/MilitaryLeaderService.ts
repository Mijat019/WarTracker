import fs from "fs";
import MilitaryLeader from "../Models/MilitaryLeader";

class MilitaryLeaderService {
    public async getAll() {
        const militaryLeaders = await MilitaryLeader.findAll();
        return militaryLeaders;
    }

    public async add(militaryLeadersPayload: any) {
        const militaryLeader = await MilitaryLeader.create(
            militaryLeadersPayload
        );
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

    public async setImage(militaryLeaderId: string, file: any) {
        const extension = file.originalname.split(".")[1];
        const newFileName = `uploads/ml/${militaryLeaderId}.${extension}`;
        fs.rename(file.path, newFileName, async () => {
            const baseUrl = "http://localhost:4200/";
            const militaryLeader = await this.update(militaryLeaderId, {
                imageUrl: `${baseUrl}${newFileName}`,
            });
            return militaryLeader;
        });
    }
}
export default new MilitaryLeaderService();
