import { IBundle, ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import useSWR from "swr";
import { fetcher } from "../../../utils";

export const useTask = (ownerId: string, type: string) => {
    const { data, error } = useSWR<IBundle>(`api/Task?owner=Practitioner/${ownerId}`, fetcher);

    const hospitalTasks = data?.entry?.filter(
        (task) => (task.resource as ITask)?.focus?.type === "DiagnosticReport"
    );

    const navTasks = data?.entry?.filter(
        (task) => (task.resource as ITask)?.requester?.reference === "Organization/12"
    );

    return {
        tasks: type === "hospital" ? hospitalTasks : navTasks,
        isLoading: !error && !data,
        isError: error,
    };
};
