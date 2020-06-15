import express from "express";
import battleMapPositionController from "../Controllers/BattleMapPositionController";

const router = express.Router();

router.get("/", battleMapPositionController.getAll);
router.get("/mapId=:mapId", battleMapPositionController.getAllForMap);
router.get("/mapName=:mapName", battleMapPositionController.getAllForMapByName);
router.get("/check/:battleId/mapNot/:mapId", battleMapPositionController.checkPlacement);
router.post("/search/mapName=:mapName", battleMapPositionController.search);
router.post("/", battleMapPositionController.add);
router.patch("/:id", battleMapPositionController.update);
router.delete("/:id", battleMapPositionController.delete);

export default router;
