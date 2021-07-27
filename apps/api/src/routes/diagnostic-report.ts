import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const diagnosticReportRouter = Router();

diagnosticReportRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/DiagnosticReport")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/DiagnosticReport/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/DiagnosticReport", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/DiagnosticReport/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

diagnosticReportRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/DiagnosticReport/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
