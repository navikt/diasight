import { Router } from "express";
import { linkedinToPractitioneerMapper } from "../auth/linkedin-to-practitioneer";
import { LinkedinUser } from "@diasight/linkedin";
import fhirClient from "../utils/fhir-client";
import * as getUuidByString from "uuid-by-string";
import { fkrGetPatient } from "@diasight/fkr-client";


export const userRouter = Router();

userRouter.get("", async (req, res) => {
    if (req.isAuthenticated()) {
        const linkedinUser = req.user as LinkedinUser;
        const resourceId = getUuidByString("linkedin:" + linkedinUser.id);
        try {
            const storedUserResult = await fhirClient.get("/Practitioner/" + resourceId);
            if (storedUserResult.data.resourceType === "Practitioner") {
                res.send(storedUserResult.data);
            } else {
                res.send({
                    status: storedUserResult.status,
                    statusText: storedUserResult.statusText,
                });
            }
        } catch (e) {
            if (e.response.data.resourceType === "OperationOutcome") {
                const newUser = linkedinToPractitioneerMapper(linkedinUser);
                newUser.id = resourceId;
                const newUserResult = await fhirClient.put("/Practitioner/" + resourceId, newUser);
                res.send(newUserResult.data);
            } else {
                res.send(e.message);
            }
        }
    } else {
        res.send({});
    }
});

userRouter.get("/patients", async (req, res) => {
    try {
        const patients = await fkrGetPatient();
        res.send(patients);
    } catch (e) {
        res.send(e.message);
    }
});
