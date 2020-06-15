import express from "express";
import battleController from "../Controllers/BattleController";

const router = express.Router();

router.get("/", battleController.getAll);
router.get("/filters", battleController.getFilters);
router.post("/filter", battleController.getAndFilter);
router.post("/", battleController.add);
router.patch("/:id", battleController.update);
router.delete("/:id", battleController.delete);

export default router;
