import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle_Entry, ITask } from "@ahryman40k/ts-fhir-types/lib/R4";

export type INavCardWithOwner = [];

export const useNAVtask = (receiverId: string, requesterId: string) => {
    const { data, error } = useSWR<IBundle_Entry[]>(
        `api/Task?owner=${receiverId}&requester=${requesterId}`,
        fetcher
    );

    return {
        NAVtasks: data?.map((task) => task.resource as ITask),
        isLoading: !error && !data,
        isError: error,
    };
};
