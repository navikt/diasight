import express = require("express");
import axios from "axios";

export const questionnaireResponseRouter = express.Router();

questionnaireResponseRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/QuestionnaireResponse")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
});

questionnaireResponseRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get("http://localhost:8888/fhir/QuestionnaireResponse/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/QuestionnaireResponse", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put("http://localhost:8888/fhir/QuestionnaireResponse/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

questionnaireResponseRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete("http://localhost:8888/fhir/QuestionnaireResponse/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
