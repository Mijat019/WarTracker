import { Request, Response } from "express";
import warService from "../Services/WarService";

class WarController {
    public async getAll(req: Request, res: Response) {
        try {
            const wars = await warService.getAll();
            res.send(wars);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new WarController();
