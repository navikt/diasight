import { Router } from "express";
import fhirClient from "../utils/fhir-client";
import { logger } from "../utils/logger";

export const baseRouter = Router();

baseRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/", req.body)
        .then((result) => {
            res.send(result.data);
        })
        .catch(logger.error);
});
