import fetcher from "../../../utils/fetcher";
import useSWR from "swr"

export const usePatient = (id: number) => {
    const { data, error } = useSWR(`api/Patient/${id}`, fetcher);

    return {
        patient: data,
        isLoading: !error && !data,
        isError: error,
    }
}