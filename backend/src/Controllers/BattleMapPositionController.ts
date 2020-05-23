import { Request, Response } from "express";
import battleMapPositionService from "../Services/BattleMapPositionService";
import BattleService from "../Services/BattleService";

class BattleMapPositionController {
  public async getAll(req: Request, res: Response) {
    try {
      const battleMapPositions = await battleMapPositionService.getAll();
      res.send(battleMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAllForMap(req: Request, res: Response) {
    try {
      const { mapId } = req.params;
      const battleMapPositions = await battleMapPositionService.getAllForMap(
        mapId
      );
      res.send(battleMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getAllForMapByName(req: Request, res: Response) {
    try {
      const { mapName } = req.params;
      console.log(mapName);
      const battleMapPositions = await battleMapPositionService.getAllForMapName(
          mapName
      );
      res.send(battleMapPositions);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const battleMapPosition = await battleMapPositionService.add(req.body);
      res.send(battleMapPosition);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const { battle } = req.body;
      await BattleService.update(battle.id, battle);

      const battleMapPosition = await battleMapPositionService.update(
        id,
        req.body
      );
      res.send(battleMapPosition);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await battleMapPositionService.delete(id);
      res.send("Deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new BattleMapPositionController();
