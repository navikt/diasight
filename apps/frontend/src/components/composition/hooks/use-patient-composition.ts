import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle, IBundle_Entry, IBundle_Search, IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientComposition = (patientID: string) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<IBundle>(`api/Composition/${patientID}`, fetcher);

    return {
        compositions: data?.total ? data.entry?.map(resource => resource as IComposition) : undefined,
        isLoading: !error && !data,
        isError: error,
    };
};
