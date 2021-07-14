import fetcher from "../../../utils/fetcher";
import useSWR from "swr"

export const usePatientEntry = (reference: string) => {
    // Possibly add type IPatient
    const { data, error } = useSWR(`api/${reference}`, fetcher);

    return {
        entry: data,
        isLoading: !error && !data,
        isError: error,
    }
}