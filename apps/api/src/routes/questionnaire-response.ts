import express = require("express");
import smart = require("fhirclient");
import { smartSettings } from "./constants";

export const questionnaireResponseRouter = express.Router();

questionnaireResponseRouter
    .route("/")
    .get((req, res) => {
        smart(req, res)
            .init({ ...smartSettings, redirectUri: "/" })
            .then(async (client) => {
                const data = await (client.patient.id
                    ? client.patient.read()
                    : client.request("QuestionnaireResponse"));
                res.type("json").send(JSON.stringify(data, null, 4));
            });
    })
    .post((req, res) => {
        res.send("hi post /QuestionnaireResponse");
    });

questionnaireResponseRouter.get("/:id", (req, res) => {
    const id = req.params.id;

    smart(req, res)
        .init({ ...smartSettings, redirectUri: "/" })
        .then(async (client) => {
            const data = await client.request(`QuestionnaireResponse/${id}`);
            res.send(JSON.stringify(data));
        });
});

questionnaireResponseRouter
    .route("&_id=1")
    .put((req, res) => {
        res.send("hi put /QuestionnaireResponse");
    })
    .delete((req, res) => {
        res.send("hi delete /QuestionnaireResponse");
    });
