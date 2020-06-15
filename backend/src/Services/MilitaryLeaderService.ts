import { promises as fs } from "fs";
import MilitaryLeader from "../Models/MilitaryLeader";
import sequelize from "../Models/database";
import {Op} from "sequelize";
class MilitaryLeaderService {
    public async getAll() {
        const militaryLeaders = await MilitaryLeader.findAll();
        return militaryLeaders;
    }

    public async add(militaryLeadersPayload: any) {
        const { id } = await MilitaryLeader.create(militaryLeadersPayload);
        const militaryLeader = await MilitaryLeader.findByPk(id);
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
        // rename the file because multer names it stupid
        // and doesn't add the extension
        await fs.rename(file.path, newFileName);

        const baseUrl = "http://localhost:4200/";
        const militaryLeader = await this.update(militaryLeaderId, {
            imageUrl: `${baseUrl}${newFileName}`,
        });
        return militaryLeader;
    }
}
export default new MilitaryLeaderService();
