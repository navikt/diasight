import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const medicationRequestRouter = Router();

medicationRequestRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/MedicationRequest")
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/MedicationRequest?_include=MedicationRequest:requester&_id=" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/MedicationRequest", req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/MedicationRequest/" + id, req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRequestRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/MedicationRequest/" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});
