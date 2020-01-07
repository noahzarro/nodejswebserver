import express from "express";
import { text } from "../data/text";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json(text);
});
