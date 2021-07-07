import * as express from "express";
import * as session from "express-session";
import { patientRouter } from "./routes/patient";

const app = express();
const port = process.env.port || 3333;

const server = app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/api");
});

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/api/Patient", patientRouter);

server.on("error", console.error);
