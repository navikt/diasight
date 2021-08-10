/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from "express";
import { generateQuestionnaire } from "./generators/questionnaire";
import { generatePractitioner } from "./generators/practitioner";
import { generateHospitalTask, generateNavTask } from "./generators/tasks";

const app = express();

app.get("/api", (req, res) => {
    res.send({ message: "Welcome to testdata!" });
});

app.get("/api/test", (req, res) => {
    const data = [];

    data.push(generateQuestionnaire());
    data.push(generatePractitioner());
    data.push(generateNavTask(1001));
    data.push(generateNavTask(1002));
    data.push(generateNavTask(1003));
    data.push(generateNavTask(1004));
    data.push(generateHospitalTask(1005));
    data.push(generateHospitalTask(1006));
    data.push(generateHospitalTask(1007));
    data.push(generateHospitalTask(1008));
    res.send(data);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
