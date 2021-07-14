import express = require("express");
import axios from "axios";

export const observationRouter = express.Router();

observationRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/Observation")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get("http://localhost:8888/fhir/Observation?_include=Observation:performer&_id=" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/Observation", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put("http://localhost:8888/fhir/Observation/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete("http://localhost:8888/fhir/Observation/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
