import { IBundle, IBundle_Entry } from "@ahryman40k/ts-fhir-types/lib/R4";
import { fetcher } from "../../../utils";
import useSWR from "swr";

export const useTaskCard = (taskId: string, ownerId: string) => {
    const { data, error } = useSWR<IBundle>(
        `api/Task?_id=${taskId}&owner=${ownerId}&_include=Task:*`,
        fetcher
    );

    return {
        card: data?.entry as IBundle_Entry[],
        isLoading: !error && !data,
        isError: error,
    };
};
