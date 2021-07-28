import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const serviceRequestRouter = Router();

serviceRequestRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/ServiceRequest")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

serviceRequestRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/ServiceRequest?_include=ServiceRequest:requester&_id=" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

serviceRequestRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/ServiceRequest", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

serviceRequestRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/ServiceRequest/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

serviceRequestRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/ServiceRequest/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
