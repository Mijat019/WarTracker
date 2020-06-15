import express from "express";
import battleController from "../Controllers/BattleController";
import multer from "multer";

const router = express.Router();

router.get("/", battleController.getAll);
router.get("/filters", battleController.getFilters);
router.post("/filter", battleController.getAndFilter);
router.post("/", battleController.add);
router.patch("/:id", battleController.update);
router.delete("/:id", battleController.delete);

const upload = multer({ dest: "uploads/b/" });
router.post("/:id", upload.single("icon"), battleController.uploadIcon);

export default router;
