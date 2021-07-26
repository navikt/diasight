import { IBundle_Entry } from "@ahryman40k/ts-fhir-types/lib/R4";
import { fetcher } from "../../../utils";
import useSWR from "swr";

export const useTaskBeneficiary = (patientId: string) => {
    const { data, error } = useSWR<IBundle_Entry>(`api/Patient/${patientId}`, fetcher);

    return {
        patient: data,
        isLoading: !error && !data,
        isError: error,
    };
};
