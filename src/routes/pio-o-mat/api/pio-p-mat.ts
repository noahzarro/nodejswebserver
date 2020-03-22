import bodyParser from "body-parser";
import express from "express";
import basicAuth from "express-basic-auth";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

export const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

const authorizerFunction = (username: string, password: string) => {
    if (basicAuth.safeCompare(username, "noahzarro@gmail.com")) {
        return true;
    }
};

// basic auth
const login = basicAuth({ authorizer: authorizerFunction });

// token request
interface ITokenRequest extends express.Request {
    email: string;
}

// token verification
const tokenAuthentication = (
    req: ITokenRequest,
    res: express.Response,
    next: express.NextFunction
) => {
    const email = jsonwebtoken.verify(
        req.headers.authorization,
        "secret"
    ) as string;
    console.log(email);
    console.log(typeof email);
    if (userExists(email)) {
        req.email = email;
        next();
    } else {
        res.status(401).send();
    }
};

// access from app

// register
router.post("/register", jsonParser, (req, res) => {});

// get token
router.get(
    "/login",
    login,
    jsonParser,
    (req: basicAuth.IBasicAuthedRequest, res) => {
        console.log(req.auth.user);
        const token = jsonwebtoken.sign(req.auth.user, "secret");
        console.log(token);
        res.send(token);
    }
);

// get statistics
router.get("/statistics", (req, res) => {});

// get cards
router.get("/cards:id", (req, res) => {});

// get quote of the day
router.get("/quotes", tokenAuthentication, (req: ITokenRequest, res) => {
    console.log(req.headers.authorization);
    // token = req.headers.token;
    const email = req.email;
    console.log(email);
    res.send("fuk of juses");
});

// access from raspi

// send statistics and new consumptions
router.post("/update", (req, res) => {});

// confirm binding of account to RFID card
router.post("/confirm-registration", (req, res) => {});

router.get("/pending", (req, res) => {
    const pending = fs.readFileSync("../data/pending.json", "utf8");
    const newAccounts = JSON.parse(pending);
    res.json(newAccounts);
});

// helper functions

// check if user exists
function userExists(email: string): boolean {
    return true;
}
