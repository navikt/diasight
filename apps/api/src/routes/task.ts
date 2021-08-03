import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const taskRouter = Router();

taskRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Task", { params: req.query })
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
