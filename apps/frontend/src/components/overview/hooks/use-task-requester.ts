import { IBundle_Entry } from "@ahryman40k/ts-fhir-types/lib/R4";
import { fetcher } from "../../../utils";
import useSWR from "swr";

export const useTaskRequester = (practitionerId: string) => {
    const { data, error } = useSWR<IBundle_Entry>(`api/Practitioner/${practitionerId}`, fetcher);

    return {
        practitioner: data,
        isLoading: !error && !data,
        isError: error,
    };
};
