import express from "express";
import battleMapPositionController from "../Controllers/BattleMapPositionController";

const router = express.Router();

router.get("/", battleMapPositionController.getAll);
router.get("/:mapId", battleMapPositionController.getAllForMap);
router.post("/", battleMapPositionController.add);
router.patch("/:id", battleMapPositionController.update);
router.delete("/:id", battleMapPositionController.delete);

export default router;
