import express = require("express");
import axios from "axios";

export const medicationRequestRouter = express.Router();

medicationRequestRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/MedicationRequest")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get("http://localhost:8888/fhir/MedicationRequest?_include=MedicationRequest:requester&_id=" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/MedicationRequest", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put("http://localhost:8888/fhir/MedicationRequest/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete("http://localhost:8888/fhir/MedicationRequest/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
