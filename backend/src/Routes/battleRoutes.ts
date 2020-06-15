import express from "express";
import battleController from "../Controllers/BattleController";

const router = express.Router();

router.get("/", battleController.getAll);
router.post("/", battleController.add);
router.post("/search", battleController.search)
router.patch("/:id", battleController.update);
router.delete("/:id", battleController.delete);

export default router;
