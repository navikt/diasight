import fetcher from "../../../utils/fetcher";
import useSWR from "swr"

export const usePatientCondition = (id: number) => {
    // Possibly add type IPatient
    const { data, error } = useSWR(`api/Condition/${id}`, fetcher);

    return {
        condition: data,
        isLoading: !error && !data,
        isError: error,
    }
}