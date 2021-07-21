import { fetcher } from "../../../utils";
import useSWR from "swr"
import { ICondition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientCondition = (ref: IReference) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<ICondition>(`api/${ref.reference}`, fetcher);

    return {
        condition: data,
        isLoading: !error && !data,
        isError: error,
    }
}