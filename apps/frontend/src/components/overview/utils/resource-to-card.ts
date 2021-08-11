import {
    IBundle_Entry,
    ICondition,
    IDiagnosticReport,
    IOrganization,
    IPatient,
    IPractitioner,
    IQuestionnaire,
    ITask,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { humanNameToString } from "../../../utils";
import { dateReverser } from "./date-reverser";

interface ICard {
    date: string;
    title: string;
    subject: string;
    details: string;
    link: string;
}

export const bundleToCard = (bundle: IBundle_Entry[], receiverId: string): ICard => {
    const resourceType = (bundle[0].resource as ITask).focus?.type;

    switch (resourceType) {
        case "DiagnosticReport":
            return hospitalTaskToEntry(bundle, receiverId);
        case "Questionnaire":
            return navTaskToEntry(bundle);
        default:
            return {
                date: "0000-00-00",
                title: "Ukjent",
                subject: "Ukjent",
                details: "Ukjent",
                link: "Ukjent",
            };
    }
};

const hospitalTaskToEntry = (entry: IBundle_Entry[], receiverId: string): ICard => {
    const task = entry[0].resource as ITask;
    const patient = entry.find((e) => e.resource?.resourceType === "Patient")?.resource as IPatient;
    const practitioner = entry.find(
        (e) => e.resource?.resourceType === "Practitioner" && e.resource.id !== receiverId
    )?.resource as IPractitioner;

    return {
        // The date at which the practitioner received the task
        date: task.lastModified ? dateReverser(task.lastModified) : "00.00.0000",
        // The type of DiagnosticReport that the task concerns
        title: task.description ? task.description : "Ukjent",
        // The patient in which the task involves
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        // The name of the practitioner that sent the task
        details: practitioner.name ? humanNameToString(practitioner.name[0]) : "Ukjent",
        // The component that this task card should link to
        link: task.for?.reference ? task.for?.reference : "Ukjent",
    };
};

const navTaskToEntry = (entry: IBundle_Entry[]): ICard => {
    const task = entry[0].resource as ITask;
    const patient = entry.find((e) => e.resource?.resourceType === "Patient")?.resource as IPatient;
    const condition = entry.find((e) => e.resource?.resourceType === "Condition")
        ?.resource as ICondition;

    return {
        // The date at which the practitioner received the task
        date: task.lastModified ? dateReverser(task.lastModified) : "00.00.0000",
        // The type of Questionnaire that the task concerns
        title: task.description ? task.description : "Ukjent",
        // The patient in which the task involves
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        // The diagnosis in which the task involves
        details: condition?.code?.text ? condition?.code?.text : "Ukjent",
        // The component that this task card should link to
        link: task.for?.reference ? task.for?.reference : "Ukjent",
    };
};
