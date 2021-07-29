import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const patientRouter = Router();
const requestUrl = "/Patient";

patientRouter.get("", async (req, res) => {
    await fhirClient
        .get(requestUrl, { params: req.query })
        .then((response) => {
            res.send(JSON.stringify(response.data.entry));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get(requestUrl + "/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.post("/", async (req, res) => {
    await fhirClient
        .post(requestUrl, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put(requestUrl + "/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

patientRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete(requestUrl + "/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
