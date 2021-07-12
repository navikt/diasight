import * as express from "express";
import * as session from "express-session";
import { patientRouter } from "./routes/patient";
import { questionnaireRouter } from "./routes/questionnaire";
import { questionnaireResponseRouter } from "./routes/questionnaire-response";
import { conditionRouter } from "./routes/condition";
import { observationRouter } from "./routes/observation";

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

server.on("error", console.error);
