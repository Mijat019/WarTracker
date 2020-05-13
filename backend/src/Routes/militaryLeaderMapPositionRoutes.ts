import express from "express";
import militaryLeaderMapPositionController from "../Controllers/MilitaryLeaderMapPositionController";

const router = express.Router();

router.get("/", militaryLeaderMapPositionController.getAll);
router.get("/:mapId", militaryLeaderMapPositionController.getAllForMap);
router.post("/", militaryLeaderMapPositionController.add);
router.patch("/:id", militaryLeaderMapPositionController.update);
router.delete("/:id", militaryLeaderMapPositionController.delete);

export default router;
