import {
    ITask,
    IQuestionnaire,
    IDiagnosticReport,
    IPractitioner,
    IPatient,
    ICondition,
    IOrganization,
    IBundle,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { fetcher } from "../../../utils";
import useSWR from "swr";

// Although "hosptial" and "nav" tasks reference many of the same
// resource types, they tend to come in completely different orders
export type ICardWithOwner = [
    ITask,
    IPatient | IPractitioner,
    IPractitioner | IPatient,
    IPractitioner | ICondition,
    ICondition | IQuestionnaire,
    IDiagnosticReport | IOrganization
];

export const useTaskCard = (taskId: string, ownerId: string) => {
    const { data, error } = useSWR<IBundle>(
        `api/Task?_id=${taskId}&owner=${ownerId}&_include=Task:*`,
        fetcher
    );

    if (!data?.entry || data?.entry.length !== 6) {
        return { entry: undefined, isLoading: false, isError: true };
    }

    const result = [
        data.entry[0].resource,
        data.entry[1].resource,
        data.entry[2].resource,
        data.entry[3].resource,
        data.entry[4].resource,
        data.entry[5].resource,
    ] as ICardWithOwner;

    return {
        card: result,
        isLoading: !error && !data,
        isError: error,
    };
};
