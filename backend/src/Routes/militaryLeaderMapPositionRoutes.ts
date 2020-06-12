import express from "express";
import militaryLeaderMapPositionController from "../Controllers/MilitaryLeaderMapPositionController";

const router = express.Router();

router.get("/", militaryLeaderMapPositionController.getAll);
router.get("/mapId=:mapId", militaryLeaderMapPositionController.getAllForMap);
router.get("/mapName=:mapName", militaryLeaderMapPositionController.getAllForMapByName);
router.get("/check/:militaryLeaderId/mapNot/:mapId", militaryLeaderMapPositionController.checkPlacement)
router.post("/", militaryLeaderMapPositionController.add);
router.patch("/:id", militaryLeaderMapPositionController.update);
router.delete("/:id", militaryLeaderMapPositionController.delete);

export default router;
