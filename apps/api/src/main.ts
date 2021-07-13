import * as express from "express";
import * as session from "express-session";
import { patientRouter } from "./routes/patient";
import { questionnaireRouter } from "./routes/questionnaire";
import { questionnaireResponseRouter } from "./routes/questionnaire-response";
import { conditionRouter } from "./routes/condition";
import { observationRouter } from "./routes/observation";
import { practitionerRouter } from "./routes/practitioner";
import { diagnosticReportRouter } from "./routes/diagnostic-report";
import { serviceRequestRouter } from "./routes/service-request";
import { medicationRequestRouter } from "./routes/medication-request";
import { medicationRouter } from "./routes/medication";
import { appointmentRouter } from "./routes/appointment";

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
