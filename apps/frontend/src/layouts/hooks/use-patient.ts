import { fetcher } from "../../utils";
import useSWR from "swr";
import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatient = (id: number) => {
    const { data, error } = useSWR<IPatient>(`api/Patient/${id}`, fetcher);
    return {
        patient: data,
        isLoading: !error && !data,
        isError: error,
    };
};
