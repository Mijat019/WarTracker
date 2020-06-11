import { Request, Response } from "express";
import militaryLeaderBattlesService from "../Services/MilitaryLeaderBattleService";

class MilitaryLeaderBattleController {
    public async getAll(req: Request, res: Response) {
        try {
            const militaryLeaderBattles = await militaryLeaderBattlesService.getAll();
            res.send(militaryLeaderBattles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    public async getByMap(req: Request, res: Response) {
        try {
            const { mapId } = req.params;
            const militaryLeaderBattles = await militaryLeaderBattlesService.getAllForMap(mapId);
            res.send(militaryLeaderBattles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async additionalBattle(req: Request, res: Response) {
        try {
            const { mapId, battleId } = req.params;
            const militaryLeaderBattles = await militaryLeaderBattlesService.additionalBattle(mapId, battleId);
            res.send(militaryLeaderBattles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async additionalMilitaryLeader(req: Request, res: Response) {
        try {
            const { mapId, militaryLeaderId } = req.params;
            const militaryLeaderBattles = await militaryLeaderBattlesService.additionalMilitaryLeader(mapId, militaryLeaderId);
            res.send(militaryLeaderBattles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const militaryLeaderBattle = await militaryLeaderBattlesService.add(
                req.body
            );
            res.send(militaryLeaderBattle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exists = await militaryLeaderBattlesService.exists(id);
            if (!exists) {
                res.status(400).send(`Does not exist`);
                return;
            }
            await militaryLeaderBattlesService.delete(id);
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new MilitaryLeaderBattleController();
