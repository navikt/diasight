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
import { dateReverser } from "./date-formatter";

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
        date: task.lastModified ? dateReverser(task.lastModified) : "00.00.0000",
        title: task.description ? task.description : "Ukjent",
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        details: practitioner.name ? humanNameToString(practitioner.name[0]) : "Ukjent",
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
        date: task.lastModified ? dateReverser(task.lastModified) : "00.00.0000",
        title: task.description ? task.description : "Ukjent",
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        details: (condition?.code?.coding ?? [])[0]?.display ?? "Ukjent",
        link: task.for?.reference ? task.for?.reference : "Ukjent",
    };
};
