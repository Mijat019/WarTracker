import express from "express";
import warController from "../Controllers/WarController";

const router = express.Router();

router.get("/", warController.getAll);

export default router;
