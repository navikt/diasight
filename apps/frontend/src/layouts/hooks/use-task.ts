import { IBundle, ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import useSWR from "swr";
import { fetcher } from "../../utils";

export const useTask = (ownerId: string) => {
    const { data, error } = useSWR<IBundle>(`api/Task?owner=Practitioner/${ownerId}`, fetcher);

    return {
        tasks: data?.entry?.map((task) => task.resource as ITask),
        isLoading: !error && !data,
        isError: error,
    };
};
