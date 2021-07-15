import { fetcher } from "../../../utils";
import useSWR from "swr";

export const usePatientResults = (birthdate: string) => {
    const { data, error } = useSWR(
        `api/Patient?birthdate=${birthdate}`,
        fetcher
    );

    return {
        patientResults: data,
        isLoading: !error && !data,
        isError: error,
    };
};
