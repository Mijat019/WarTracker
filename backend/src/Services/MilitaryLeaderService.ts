import { promises as fs } from "fs";
import MilitaryLeader from "../Models/MilitaryLeader";
import { Op } from "sequelize";
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

    public async getFilters() {
        let filters: any = {};
        const birthPlaces = await MilitaryLeader.findAll({
            attributes: ["birthPlace"],
            group: "birthPlace",
        });

        const schools = await MilitaryLeader.findAll({
            attributes: ["school"],
            group: "school",
        });

        const dynastyNames = await MilitaryLeader.findAll({
            attributes: ["dynastyName"],
            group: "dynastyName",
        });
        const titles = await MilitaryLeader.findAll({
            attributes: ["title"],
            group: "title",
        });

        const militaryRanks = await MilitaryLeader.findAll({
            attributes: ["militaryRank"],
            group: "militaryRank",
        });

        filters.birthPlace = birthPlaces.map((el: any) => el?.birthPlace);
        filters.school = schools.map((el: any) => el?.school);
        filters.dynastyName = dynastyNames.map((el: any) => el.dynastyName);
        filters.title = titles.map((el: any) => el?.title);
        filters.militaryRank = militaryRanks.map((el: any) => el?.militaryRank);

        return filters;
    }

    public async getAndFilter(search: any, filters: any) {
        let where: any = {};

        if (search) {
            where[Op.or] = [
                { firstName: { [Op.like]: `%${search}%` } },
                { lastName: { [Op.like]: `%${search}%` } },
            ];
        }

        for (let filter in filters) {
            where[filter] = { [Op.in]: filters[filter] };
        }

        const militaryLeaders = await MilitaryLeader.findAll({ where });
        return militaryLeaders;
    }
}
export default new MilitaryLeaderService();
