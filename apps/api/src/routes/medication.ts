import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const medicationRouter = Router();

medicationRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Medication")
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Medication/" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Medication", req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Medication/" + id, req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

medicationRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Medication/" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});
