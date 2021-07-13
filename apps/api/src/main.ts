import * as express from "express";
import * as session from "express-session";
import { patientRouter, compositionRouter, conditionRouter, appointmentRouter, questionnaireRouter, questionnaireResponseRouter, practitionerRouter, serviceRequestRouter, observationRouter, diagnosticReportRouter, medicationRequestRouter, medicationRouter } from "./routes";

const app = express();
const port = process.env.port || 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/api");
});

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
    })
);

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

server.on("error", console.error);
