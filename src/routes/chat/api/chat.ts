import bodyParser from "body-parser";
import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const jsonParser = bodyParser.json();
export const router = express.Router();

router.post("/update", jsonParser, (req, res) => {
    const tokenFile = readFileSync(path.resolve(__dirname, "../data/token.json"), "utf8");
    const tokenJson = JSON.parse(tokenFile);

    if (tokenJson.token === req.headers.authorization) {
        console.log(req.body);
        writeFileSync(path.resolve(__dirname, "../data/names.json"), JSON.stringify(req.body));
        res.status(204).send();
    } else {
        res.status(401).send();
    }
});

router.get("/names", (req, res) => {
    const namesFile = readFileSync(path.resolve(__dirname, "../data/names.json"), "utf8");
    const namesJson = JSON.parse(namesFile);
    res.send(JSON.stringify(namesJson));
});
