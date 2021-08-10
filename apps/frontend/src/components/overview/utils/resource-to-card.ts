import {
    ICondition,
    IDiagnosticReport,
    IOrganization,
    IPatient,
    IPractitioner,
    IQuestionnaire,
    ITask,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { humanNameToString } from "../../../utils";
import { ICardWithOwner } from "../hooks/use-task-card";
import { dateReverser } from "./date-reverser";

interface ICard {
    date: string;
    title: string;
    subject: string;
    details: string;
    link: string;
}

export const bundleToCard = (bundle: ICardWithOwner): ICard => {
    const resourceType = bundle[5].resourceType;

    switch (resourceType) {
        case "DiagnosticReport":
            return hospitalTaskToEntry(
                bundle as [
                    ITask,
                    IPatient,
                    IPractitioner,
                    IPractitioner,
                    ICondition,
                    IDiagnosticReport
                ]
            );
        case "Organization":
            return navTaskToEntry(
                bundle as [
                    ITask,
                    IPractitioner,
                    IPatient,
                    ICondition,
                    IQuestionnaire,
                    IOrganization
                ]
            );
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

const hospitalTaskToEntry = (
    entry: [ITask, IPatient, IPractitioner, IPractitioner, ICondition, IDiagnosticReport]
): ICard => {
    const task = entry[0];
    const patient = entry[1];
    const practitioner = entry[3];

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

const navTaskToEntry = (
    entry: [ITask, IPractitioner, IPatient, ICondition, IQuestionnaire, IOrganization]
): ICard => {
    const task = entry[0];
    const patient = entry[1];
    const condition = entry[3];

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
