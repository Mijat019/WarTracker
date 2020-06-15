import { Request, Response } from "express";
import battleMapPositionService from "../Services/BattleMapPositionService";
import BattleService from "../Services/BattleService";
import militaryLeaderMapPositionService from "../Services/MilitaryLeaderMapPositionService";

class BattleMapPositionController {
    public async getAll(req: Request, res: Response) {
        try {
            const battleMapPositions = await battleMapPositionService.getAll();
            res.send(battleMapPositions);
        } catch (error) {
            res.status(400).send(error.message);
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
            res.status(400).send(error.message);
        }
    }

    public async getAllForMapByName(req: Request, res: Response) {
        try {
            const { mapName } = req.params;
            const battleMapPositions = await battleMapPositionService.getAllForMapName(
                mapName
            );
            res.send(battleMapPositions);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async search(req: Request, res: Response) {
        try {
            const { mapName } = req.params;
            const { searchQuery } = req.body;
            const battleMapPositions = await battleMapPositionService.search(
                mapName,
                searchQuery
            );
            res.send(battleMapPositions);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async checkPlacement(req: Request, res: Response) {
        try{
            const { battleId, mapId } = req.params;
            const exists = await battleMapPositionService.exists(battleId, mapId);
            if(exists) {
                res.status(400).send('Already placed on this map');
                return;
            }
            const found = await battleMapPositionService.findOne(battleId);
            res.send(found);
        } catch(error) {
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {

            const { battle } = req.body;
            await BattleService.update(battle.id, battle);
            const toSave = {
                lat: req.body.lat,
                lng: req.body.lng,
                mapId: req.body.map.id,
                battleId: req.body.battle.id
            };
            const battleMapPosition = await battleMapPositionService.add(
                toSave
            );
            delete toSave.mapId;
            await battleMapPositionService.updateAll(toSave);
            res.send(battleMapPosition);
        } catch (error) {
            res.status(400).send(error.message);
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
            res.status(400).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await battleMapPositionService.delete(id);
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new BattleMapPositionController();
