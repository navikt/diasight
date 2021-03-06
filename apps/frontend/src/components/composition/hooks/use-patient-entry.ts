import useSWR from "swr";
import {
    IAppointment,
    IBundle,
    IDiagnosticReport,
    IMedicationRequest,
    IObservation,
    IPractitioner,
    IQuestionnaireResponse,
    IReference,
    IServiceRequest,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { fetcher } from "../../../utils";

export type IEntryWithAuthor = [
    (
        | IAppointment
        | IDiagnosticReport
        | IMedicationRequest
        | IObservation
        | IQuestionnaireResponse
        | IServiceRequest
    ),
    IPractitioner
];

export const usePatientEntry = (reference: IReference) => {
    const { data, error } = useSWR<IBundle>(`api/${reference.reference}`, fetcher);

    // Unpackage bundle as IEntryWithAuthor
    if (!data?.entry || data?.entry.length !== 2)
        return { entry: undefined, isLoading: false, isError: true };
    const result = [data?.entry[0].resource, data?.entry[1].resource] as IEntryWithAuthor;

    return {
        entry: result,
        isLoading: !error && !data,
        isError: error,
    };
};
