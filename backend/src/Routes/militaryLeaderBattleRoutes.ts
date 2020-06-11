import express from "express";
import militaryLeaderBattleController from "../Controllers/MilitaryLeaderBattleController";

const router = express.Router();

router.get("/", militaryLeaderBattleController.getAll);
router.get("/map/:mapId", militaryLeaderBattleController.getByMap);
router.get("/additionalBattle/map/:mapId/battle/:battleId", militaryLeaderBattleController.additionalBattle);
router.get("/additionalMilitaryLeader/map/:mapId/militaryLeader/:militaryLeaderId", militaryLeaderBattleController.additionalMilitaryLeader);
router.post("/", militaryLeaderBattleController.add);
router.delete("/:id", militaryLeaderBattleController.delete);

export default router;
