import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const questionnaireResponseRouter = Router();

questionnaireResponseRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/QuestionnaireResponse")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/QuestionnaireResponse/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/QuestionnaireResponse", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/QuestionnaireResponse/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/QuestionnaireResponse/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
