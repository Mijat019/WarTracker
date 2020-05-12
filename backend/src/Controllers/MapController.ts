import { Request, Response } from "express";
import mapsService from "../Services/MapService";

class MapController {
  public async getAll(req: Request, res: Response) {
    try {
      const maps = await mapsService.getAll();
      res.send(maps);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new MapController();
