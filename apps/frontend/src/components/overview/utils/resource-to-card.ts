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
import { ICardWithOwner } from "../hooks/use-task";

interface ICard {
    date: string;
    title: string;
    subject: string;
    details: string;
}

export const bundleToCard = (bundle: ICardWithOwner): ICard => {
    const resourceType = bundle[3].resourceType;

    switch (resourceType) {
        case "Practitioner":
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
                    IPatient,
                    IPractitioner,
                    IOrganization,
                    ICondition,
                    IQuestionnaire
                ]
            );
        default:
            return {
                date: "0000-00-00",
                title: "Ukjent",
                subject: "Ukjent",
                details: "Ukjent",
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
        date: task.lastModified ? task.lastModified : "0000-00-00",
        title: task.description ? task.description : "Ukjent",
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        details: practitioner.name ? humanNameToString(practitioner.name[0]) : "Ukjent",
    };
};

const navTaskToEntry = (
    entry: [ITask, IPatient, IPractitioner, IOrganization, ICondition, IQuestionnaire]
): ICard => {
    const task = entry[0];
    const patient = entry[1];
    const condition = entry[4];

    return {
        date: task.lastModified ? task.lastModified : "0000-00-00",
        title: task.description ? task.description : "Ukjent",
        subject: patient.name ? humanNameToString(patient.name[0]) : "Ukjent",
        details: condition.code?.text ? condition.code.text : "Ukjent",
    };
};
