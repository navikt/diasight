import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const questionnaireRouter = Router();

questionnaireRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Questionnaire")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Questionnaire/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Questionnaire", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Questionnaire/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Questionnaire/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
