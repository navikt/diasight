import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const practitionerRouter = Router();

practitionerRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Practitioner")
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Practitioner/" + id)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Practitioner", req.body)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Practitioner/" + id, req.body)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Practitioner/" + id)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});
