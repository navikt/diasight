import { fetcher } from "../../../utils";
import useSWR from "swr"
import { IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientComposition = (id: number) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<IComposition>(`api/Composition/${id}`, fetcher);

    return {
        composition: data,
        isLoading: !error && !data,
        isError: error,
    }
}