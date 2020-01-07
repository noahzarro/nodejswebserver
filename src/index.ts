import express from "express";
import path from "path";

import {router as router_decidobot} from "./routes/decidobot/api/decidobot";
import {router as router_puberty} from "./routes/puberty/api/puberty";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/decidobot/api", router_decidobot);
app.use("/puberty/api", router_puberty);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
