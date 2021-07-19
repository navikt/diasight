import { fetcher } from "../../../utils";
import useSWR from "swr";

export const usePatientResults = (identifier: string) => {
    const { data, error } = useSWR(
        `api/Patient?identifier=${identifier}`,
        fetcher
    );

    return {
        patientResults: data,
        isLoading: !error && !data,
        isError: error,
    };
};
