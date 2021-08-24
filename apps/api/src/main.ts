import * as express from "express";
import {
    appointmentRouter,
    baseRouter,
    compositionRouter,
    conditionRouter,
    diagnosticReportRouter,
    medicationRequestRouter,
    medicationRouter,
    userRouter,
    observationRouter,
    patientRouter,
    practitionerRouter,
    questionnaireResponseRouter,
    questionnaireRouter,
    serviceRequestRouter,
} from "./routes";
import { configureAuth } from "./auth";
import { internalRouter } from "./internal/internal-router";
import { taskRouter } from "./routes/task";
import { initSession } from "./auth/init-session";
import { logger } from "./utils/logger";
import { configureAuthentication } from "@diasight/linkedin";
import { urls } from "./auth/urls";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initSession(app, true);
configureAuth(app);
configureAuthentication(app, urls).then(() => logger.info("Auth ready"));
app.use("/api", baseRouter);
app.use("/api/Patient", patientRouter);
app.use("/api/user", userRouter);
app.use("/api/Composition", compositionRouter);
app.use("/api/Questionnaire", questionnaireRouter);
app.use("/api/QuestionnaireResponse", questionnaireResponseRouter);
app.use("/api/Condition", conditionRouter);
app.use("/api/Observation", observationRouter);
app.use("/api/Practitioner", practitionerRouter);
app.use("/api/DiagnosticReport", diagnosticReportRouter);
app.use("/api/ServiceRequest", serviceRequestRouter);
app.use("/api/MedicationRequest", medicationRequestRouter);
app.use("/api/Medication", medicationRouter);
app.use("/api/Appointment", appointmentRouter);
app.use("/api/Task", taskRouter);
app.use("/internal", internalRouter);
const port = process.env.SERVER_PORT || 3333;
const server = app.listen(port, () => {
    logger.info("Listening at http://localhost:" + port + "/api");
});
server.on("error", logger.error);
