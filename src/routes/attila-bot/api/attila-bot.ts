import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import path from "path";

import { ILevelData } from "./interfaces";

export const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

// token verification
const tokenAuthentication = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const token = req.headers.authorization;
    if (token === getToken()) {
        next();
    } else {
        res.status(401).send();
    }
};

// publish current data
router.get("/", (req, res) => {
    res.json(readCurrentData());
});

// update current data
router.post("/", tokenAuthentication, jsonParser, (req, res) => {
    const new_current_data = req.body;
    const current_data = readCurrentData();
    for (let i = 0; i < current_data.length; i++) {
        if (current_data[i].Stufe === new_current_data.Stufe) {
            current_data[i] = new_current_data;
        }
    }
    writeCurrentData(current_data);
    res.status(204).send();
});

// publish standard data
router.get("/standard", (req, res) => {
    res.json(readStandardData());
});

// update standard data
router.post("/standard", tokenAuthentication, jsonParser, (req, res) => {
    const new_standard_data = req.body;
    const current_standard_data = readStandardData();
    for (let i = 0; i < current_standard_data.length; i++) {
        if (current_standard_data[i].Stufe === new_standard_data.Stufe) {
            current_standard_data[i] = new_standard_data;
        }
    }
    writeStandardData(current_standard_data);
    res.status(204).send();
});

// reads current data
function readCurrentData(): ILevelData[] {
    return JSON.parse(
        fs
            .readFileSync(
                path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "..",
                    "data",
                    "attila-bot",
                    "current_data.json"
                )
            )
            .toString()
    );
}

// overwrites current data
function writeCurrentData(current_data: ILevelData[]) {
    fs.writeFileSync(
        path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "data",
            "attila-bot",
            "current_data.json"
        ),
        JSON.stringify(current_data)
    );
}

// reads standard data
function readStandardData(): ILevelData[] {
    return JSON.parse(
        fs
            .readFileSync(
                path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "..",
                    "data",
                    "attila-bot",
                    "standard_data.json"
                )
            )
            .toString()
    );
}

// overwrites standard data
function writeStandardData(current_data: ILevelData[]) {
    fs.writeFileSync(
        path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "data",
            "attila-bot",
            "standard_data.json"
        ),
        JSON.stringify(current_data)
    );
}

// reads token
function getToken(): string {
    return JSON.parse(
        fs
            .readFileSync(
                path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "..",
                    "data",
                    "attila-bot",
                    "token.json"
                )
            )
            .toString()
    ).token;
}
