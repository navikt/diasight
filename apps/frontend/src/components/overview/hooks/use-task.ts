import {
    ITask,
    IQuestionnaire,
    IDiagnosticReport,
    IPractitioner,
    IPatient,
    ICondition,
    IOrganization,
} from "@ahryman40k/ts-fhir-types/lib/R4";

export type ICardWithOwner = [
    ITask,
    IPatient,
    IPractitioner,
    IPractitioner | IOrganization,
    ICondition,
    IDiagnosticReport | IQuestionnaire
];
