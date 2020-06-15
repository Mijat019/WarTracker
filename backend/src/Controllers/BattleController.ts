import { Request, Response } from "express";
import battleService from "../Services/BattleService";

class BattleController {
    public async getAll(req: Request, res: Response) {
        try {
            const battles = await battleService.getAll();
            res.send(battles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async search(req: Request, res: Response) {
        try {
            const { searchQuery } = req.body;
            let battles;
            if(!searchQuery)
                battles = await battleService.getAll();
            else
                battles = await battleService.search(searchQuery);
            res.send(battles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const battle = await battleService.add(req.body);
            res.send(battle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedBattle = await battleService.update(id, req.body);
            res.send(updatedBattle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await battleService.delete(id);
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new BattleController();
