import { fetcher } from "../../../utils";
import useSWR from "swr"
import { IQuestionnaire } from "@ahryman40k/ts-fhir-types/lib/R4";

export const useQuestionnaire = (id: number) => {
    // Possibly add type IPatient
    const { data, error } = useSWR<IQuestionnaire>(`api/Questionnaire/${id}`, fetcher);

    return {
        questionnaire: data,
        isLoading: !error && !data,
        isError: error,
    }
}
