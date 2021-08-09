import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle_Entry, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { findQueryString } from "../utils/patient-search-keyword";

export const usePatientResults = (searchValue: string) => {
    const queryString = findQueryString(searchValue);

    console.log(queryString);

    const { data, error } = useSWR<IBundle_Entry[]>(`api/Patient${queryString}`, fetcher);

    return {
        patientResults: data?.map((patient) => patient.resource as IPatient),
        isLoading: !error && !data,
        isError: error,
    };
};
