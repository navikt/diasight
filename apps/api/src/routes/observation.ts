import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const observationRouter = Router();

observationRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Observation")
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Observation?_include=Observation:performer&_id=" + id)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Observation", req.body)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Observation/" + id, req.body)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

observationRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Observation/" + id)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});
