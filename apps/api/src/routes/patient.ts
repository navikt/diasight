import express = require("express");
import axios from "axios";

export const patientRouter = express.Router();

patientRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/Patient")
        .then((response) => res.send(JSON.stringify(response.data)))
        .catch((error) => console.log(error));
});

patientRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/Patient", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => res.send(error));
});
