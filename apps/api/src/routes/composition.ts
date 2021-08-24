import { Router } from "express";
import fhirClient from "../utils/fhir-client";
import { logger } from "../utils/logger";

export const compositionRouter = Router();

compositionRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    await fhirClient
        .get("/Composition?subject=Patient/" + id)
        .then((response) =>             res.send(response.data))
        .catch(logger.error);
});
