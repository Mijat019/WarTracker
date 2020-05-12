import express from "express";
import militaryLeaderWarController from "../Controllers/MilitaryLeaderWarController";

const router = express.Router();

router.get("/", militaryLeaderWarController.getAll);
router.post("/", militaryLeaderWarController.add);
router.delete("/:id", militaryLeaderWarController.delete);

export default router;
