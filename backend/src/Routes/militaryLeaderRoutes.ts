import express from "express";
import militaryLeaderController from "../Controllers/MilitaryLeaderController";

const router = express.Router();

router.get("/", militaryLeaderController.getAll);
router.post("/", militaryLeaderController.add);
router.patch("/:id", militaryLeaderController.update);
router.delete("/:id", militaryLeaderController.delete);

export default router;
