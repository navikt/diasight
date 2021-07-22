import express = require("express");
import axios from "axios";

export const patientRouter = express.Router();
const requestUrl = "http://localhost:8888/fhir/Patient";

patientRouter.get("", async (req, res) => {
    await axios
        .get(requestUrl, { params: req.query })
        .then((response) => {
            res.send(JSON.stringify(response.data.entry));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get(requestUrl + "/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.post("/", async (req, res) => {
    await axios
        .post(requestUrl, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put(requestUrl + "/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete(requestUrl + "/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
