import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const baseRouter = Router();

baseRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/", req.body)
        .then((result) => {
            console.log(result);
            res.send(result.data);
        })
        .catch((error) => console.log(error));
});
