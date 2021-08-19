import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const conditionRouter = Router();

conditionRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Condition")
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

conditionRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Condition/" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

conditionRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Condition", req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

conditionRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Condition/" + id, req.body)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});

conditionRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Condition/" + id)
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            res.send(error);
        });
});
