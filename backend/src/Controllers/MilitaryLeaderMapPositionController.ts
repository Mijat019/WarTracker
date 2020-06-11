import { Request, Response } from "express";
import militaryLeaderMapPositionService from "../Services/MilitaryLeaderMapPositionService";
import MilitaryLeaderService from "../Services/MilitaryLeaderService";

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
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const { militaryLeader } = req.body;
            await MilitaryLeaderService.update(
                militaryLeader.id,
                militaryLeader
            );
            const toSave = {
                lat: req.body.lat,
                lng: req.body.lng,
                mapId: req.body.map.id,
                militaryLeaderId: req.body.militaryLeader.id,
            };
            const militaryLeaderMapPosition = await militaryLeaderMapPositionService.add(
                toSave
            );
            res.send(militaryLeaderMapPosition);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { militaryLeader } = req.body;
            await MilitaryLeaderService.update(
                militaryLeader.id,
                militaryLeader
            );
            const militaryLeaderMapPosition = await militaryLeaderMapPositionService.update(
                id,
                req.body
            );
            res.send(militaryLeaderMapPosition);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await militaryLeaderMapPositionService.delete(id);
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new MilitaryLeaderMapPositionController();
