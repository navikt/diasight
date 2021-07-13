import fetcher from "../../../utils/fetcher";
import useSWR from "swr"
import { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientCondition = (id: number) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<ICondition>(`api/Condition/${id}`, fetcher);

    return {
        condition: data,
        isLoading: !error && !data,
        isError: error,
    }
}