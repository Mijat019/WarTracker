import { Request, Response } from "express";
import militaryLeaderMapPositionService from "../Services/MilitaryLeaderMapPositionService";

class MilitaryLeaderMapPositionController {
  public async getAllForMap(req: Request, res: Response) {
    try {
      const { mapId } = req.params;
      const militaryLeaderMapPositions = await militaryLeaderMapPositionService.getAllForMap(
        mapId
      );
      res.send(militaryLeaderMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAllForMapByName(req: Request, res: Response) {
    try {
      const { mapName } = req.params;
      const militaryLeaderMapPositions = await militaryLeaderMapPositionService.getAllForMapByName(
          mapName
      );
      res.send(militaryLeaderMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const militaryLeaderMapPositions = await militaryLeaderMapPositionService.getAll();
      res.send(militaryLeaderMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const militaryLeaderMapPosition = await militaryLeaderMapPositionService.add(
        req.body
      );
      res.send(militaryLeaderMapPosition);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const militaryLeaderMapPosition = await militaryLeaderMapPositionService.update(
        id,
        req.body
      );
      res.send(militaryLeaderMapPosition);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await militaryLeaderMapPositionService.delete(id);
      res.send("Deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new MilitaryLeaderMapPositionController();
