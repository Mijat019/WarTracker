import { Request, Response } from "express";
import mapsService from "../Services/MapService";

class MapController {
    public async getAll(req: Request, res: Response) {
        try {
            const maps = await mapsService.getAll();
            res.send(maps);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getByName(req: Request, res: Response) {
        try {
            const {mapName} = await req.params;
            console.log(mapName);
            console.log("MAPAAAAAAAAAAAAAAAAAAAAAAAAA");
            const map = await mapsService.getMapByName(mapName);
            res.send(map);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new MapController();
