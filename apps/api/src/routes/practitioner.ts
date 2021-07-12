import express = require("express");
import axios from "axios";

export const practitionerRouter = express.Router();

practitionerRouter.get("/", async (req, res) => {
    await axios
        .get("http://localhost:8888/fhir/Practitioner")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .get("http://localhost:8888/fhir/Practitioner/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.post("/", async (req, res) => {
    await axios
        .post("http://localhost:8888/fhir/Practitioner", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .put("http://localhost:8888/fhir/Practitioner/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

practitionerRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await axios
        .delete("http://localhost:8888/fhir/Practitioner/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
