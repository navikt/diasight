import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientResults = (identifier: string) => {
    const { data, error } = useSWR<IBundle>(`api/Patient?identifier=${identifier}`, fetcher);

    return {
        patientResults: data,
        isLoading: !error && !data,
        isError: error,
    };
};
