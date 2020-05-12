import { Request, Response } from "express";
import militaryLeaderBattlesService from "../Services/MilitaryLeaderBattleService";

class MilitaryLeaderBattleController {
  public async getAll(req: Request, res: Response) {
    try {
      const militaryLeaderBattles = await militaryLeaderBattlesService.getAll();
      res.send(militaryLeaderBattles);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async add(req: Request, res: Response) {
    try {
      const militaryLeaderBattle = await militaryLeaderBattlesService.add(
        req.body
      );
      res.send(militaryLeaderBattle);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await militaryLeaderBattlesService.delete(id);
      res.send("Deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new MilitaryLeaderBattleController();
