import { Request, Response } from "express";
import militaryLeaderWarService from "../Services/MilitaryLeaderWarService";

class MilitaryLeaderWarController {
  public async getAll(req: Request, res: Response) {
    try {
      const militaryLeaderWars = await militaryLeaderWarService.getAll();
      res.send(militaryLeaderWars);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const militaryLeaderWar = await militaryLeaderWarService.add(req.body);
      res.send(militaryLeaderWar);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await militaryLeaderWarService.delete(id);
      res.send("Deleted");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

export default new MilitaryLeaderWarController();
