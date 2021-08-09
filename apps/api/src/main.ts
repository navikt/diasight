import * as express from "express";
import * as session from "express-session";
import {
    appointmentRouter,
    baseRouter,
    compositionRouter,
    conditionRouter,
    diagnosticReportRouter,
    medicationRequestRouter,
    medicationRouter,
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

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
    })
);
configureAuth(app);
app.use("/api", baseRouter);
app.use("/api/Patient", patientRouter);
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
    console.log("Listening at http://localhost:" + port + "/api");
});
server.on("error", console.error);
