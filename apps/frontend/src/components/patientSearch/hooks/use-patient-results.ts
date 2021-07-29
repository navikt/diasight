import { fetcher } from "../../../utils";
import useSWR from "swr";
import validator from "@navikt/fnrvalidator";
import { IBundle_Entry, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { stringify } from "query-string";

export const usePatientResults = (searchValue: string) => {
    const validationResult = validator.idnr(searchValue);
    const searchKey = (validationResult.status === "valid") ? "identifier" : "name";
    const querystring = stringify({
        [searchKey]: searchValue,
    });
    const { data, error } = useSWR<IBundle_Entry[]>(
        `api/Patient?${querystring}`,
        fetcher,
    );

    return {
        patientResults: data?.map((patient) => patient.resource as IPatient),
        isLoading: !error && !data,
        isError: error,
    };
};
