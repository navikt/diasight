import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle_Entry, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";

export const usePatientResults = (identifier: string) => {
    const { data, error } = useSWR<IBundle_Entry[]>(
        `api/Patient?identifier=${identifier}`,
        fetcher
    );

    return {
        patientResults: data?.map((patient) => patient.resource as IPatient),
        isLoading: !error && !data,
        isError: error,
    };
};
