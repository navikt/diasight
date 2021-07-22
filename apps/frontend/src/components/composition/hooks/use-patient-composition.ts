import { fetcher } from "../../../utils";
import useSWR from "swr"
import { IBundle_Entry, IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientComposition = (patientID: number) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<IBundle_Entry[]>(`api/Composition/${patientID}`, fetcher);

    return {
        compositions: data?.map((comp) => comp.resource as IComposition),
        isLoading: !error && !data,
        isError: error,
    }
}
