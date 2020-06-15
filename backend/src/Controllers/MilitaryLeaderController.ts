import fs from "fs";
import { Request, Response } from "express";
import militaryLeaderService from "../Services/MilitaryLeaderService";

class MilitaryLeaderController {
    public async getAll(req: Request, res: Response) {
        try {
            const militaryLeaders = await militaryLeaderService.getAll();
            res.send(militaryLeaders);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const militaryLeader = await militaryLeaderService.add(req.body);
            res.send(militaryLeader);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async uploadImage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const militaryLeader = await militaryLeaderService.setImage(
                id,
                req.file
            );
            res.send(militaryLeader);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedMilitaryLeader = await militaryLeaderService.update(
                id,
                req.body
            );
            res.send(updatedMilitaryLeader);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedMilitaryLeader = await militaryLeaderService.delete(
                id
            );
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getFilters(req: Request, res: Response) {
        try {
            const filters = await militaryLeaderService.getFilters();
            res.send(filters);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new MilitaryLeaderController();
