import bodyParser from "body-parser";
import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const jsonParser = bodyParser.json();
export const router = express.Router();

router.post("/wishes", jsonParser, (req, res) => {
    const wishesFile = readFileSync(path.resolve(__dirname, "../data/wishes.json"), "utf8");
    const wishesJson = JSON.parse(wishesFile);
    console.log(wishesJson);
    console.log(req.body);

    wishesJson.unshift(req.body);

    console.log(wishesJson);

    writeFileSync(path.resolve(__dirname, "../data/wishes.json"), JSON.stringify(wishesJson));
    res.status(204).send();

});

router.get("/wishes", (req, res) => {
    const wishesFile = readFileSync(path.resolve(__dirname, "../data/wishes.json"), "utf8");
    const wishesJson = JSON.parse(wishesFile);
    res.send(JSON.stringify(wishesJson));
});
