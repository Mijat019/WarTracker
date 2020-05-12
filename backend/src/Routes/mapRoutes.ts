import express from "express";
import mapController from "../Controllers/MapController";

const app = express.Router();

app.get("/", mapController.getAll);

export default app;
