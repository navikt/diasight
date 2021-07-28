import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const compositionRouter = Router();

compositionRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    await fhirClient
        .get("/Composition?subject=Patient/" + id)
        .then((result) => res.send(JSON.stringify(result.data.entry)))
        .catch((error) => console.log(error));
});
