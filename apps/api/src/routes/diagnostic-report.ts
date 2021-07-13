import express = require("express");
import axios from "axios";

export const diagnosticReportRouter = express.Router();

diagnosticReportRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/DiagnosticReport")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get("http://localhost:8888/fhir/DiagnosticReport/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/DiagnosticReport", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put("http://localhost:8888/fhir/DiagnosticReport/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete("http://localhost:8888/fhir/DiagnosticReport/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
