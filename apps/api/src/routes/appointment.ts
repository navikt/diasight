import { Router } from "express";
import fhirClient from "../utils/fhir-client";

export const appointmentRouter = Router();

appointmentRouter.get("/", async (req, res) => {
    await fhirClient
        .get("/Appointment")
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

appointmentRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .get("/Appointment/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

appointmentRouter.post("/", async (req, res) => {
    await fhirClient
        .post("/Appointment", req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

appointmentRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .put("/Appointment/" + id, req.body)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});

appointmentRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await fhirClient
        .delete("/Appointment/" + id)
        .then((response) => {
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error);
        });
});
