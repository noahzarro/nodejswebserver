import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import path from "path";

import { router as router_attila_bot } from "./routes/attila-bot/api/attila-bot";
import { router as router_chat } from "./routes/chat/api/chat";
import { router as router_decidobot } from "./routes/decidobot/api/decidobot";
import { router as router_pio_o_mat } from "./routes/pio-o-mat/api/pio-p-mat";
import { router as router_puberty } from "./routes/puberty/api/puberty";

const app = express();
const port = 8080; // default port to listen
const httpsPort = 8443; // https port

// allow cors
app.use(cors());

// define a route handler for the default home page
app.use(express.static(path.join(__dirname, "..", "public")));

// define a route handler for martins life
app.use("/martins_life", express.static(path.join(__dirname, "martins_life")));

app.use("/decidobot/api", router_decidobot);
app.use("/puberty/api", router_puberty);
app.use("/pio-o-mat/api", router_pio_o_mat);
app.use("/chat/api", router_chat);
app.use("/attila-bot/api", router_attila_bot);

// start the http webserver

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

let key;
let cert;

try {
    key = fs.readFileSync("server.key");
    cert = fs.readFileSync("server.cert");
} catch {
    key = fs.readFileSync(
        "/etc/letsencrypt/live/www.eth-lerngruppe.ch/privkey.pem"
    );
    cert = fs.readFileSync(
        "/etc/letsencrypt/live/www.eth-lerngruppe.ch/fullchain.pem"
    );
}

// start https webserver
https
    .createServer(
        {
            key,
            cert,
        },
        app
    )
    .listen(httpsPort, () => {
        console.log(`server started at https://localhost:${httpsPort}`);
    });
