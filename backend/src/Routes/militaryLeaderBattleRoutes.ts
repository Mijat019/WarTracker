import express from "express";
import militaryLeaderBattleController from "../Controllers/MilitaryLeaderBattleController";

const router = express.Router();

router.get("/", militaryLeaderBattleController.getAll);
router.get("/map/:mapId", militaryLeaderBattleController.getByMap);
router.post("/", militaryLeaderBattleController.add);
router.delete("/:id", militaryLeaderBattleController.delete);

export default router;
