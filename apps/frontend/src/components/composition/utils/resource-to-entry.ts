import {
    HumanNameUseKind,
    IMedicationRequest,
    IObservation,
    IPractitioner,
    IQuestionnaireResponse,
    IServiceRequest,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { filterHumanNameOnUse, humanNameToString } from "../../../utils";
import { IEntryWithAuthor } from "../hooks/use-patient-entry";
import { medicationRequestToDetails } from "./medication-request-to-details";

interface IEntryLine {
    date: string;
    text: string;
    type: string;
    author: string;
    department: string;
    details: string[];
}

// Add DiagnosticReport, QuestionnaireResponse and Appointment in the future.
export const bundleToEntry = (bundle: IEntryWithAuthor): IEntryLine => {
    const resourceType = bundle[0].resourceType;

    switch (resourceType) {
        case "Observation":
            return observationToEntry(bundle as [IObservation, IPractitioner]);
        case "MedicationRequest":
            return medicationRequestToEntry(bundle as [IMedicationRequest, IPractitioner]);
        case "ServiceRequest":
            return serviceRequestToEntry(bundle as [IServiceRequest, IPractitioner]);
        case "QuestionnaireResponse":
            return questionnaireResponseToEntry(bundle as [IQuestionnaireResponse, IPractitioner]);
        default:
            return {
                date: "0000-00-00",
                text: "Ukjent",
                type: "Ukjent",
                author: "Ukjent",
                department: "Ukjent",
                details: ["Ukjent"],
            };
    }
};

const observationToEntry = (entry: [IObservation, IPractitioner]): IEntryLine => {
    const observation = entry[0];
    const author = entry[1].name
        ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual)
        : null;
    return {
        date: observation.issued?.slice(0, 10),
        text: observation.code.text, //"Notat"
        type: "Observasjon",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
        details: ["Notat: " + (observation?.note ?? [])[0]?.text ?? ""],
    } as IEntryLine;
};

const serviceRequestToEntry = (entry: [IServiceRequest, IPractitioner]): IEntryLine => {
    const serviceRequest = entry[0];
    const author = entry[1].name
        ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual)
        : null;

    return {
        date: serviceRequest.authoredOn,
        text: serviceRequest.code?.text,
        type: "Henvisning",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
        details: [
            "Henvisnigen ble sendt til " + (serviceRequest?.performer ?? [])[0]?.display ??
                "Ukjent",
        ],
    } as IEntryLine;
};

const medicationRequestToEntry = (entry: [IMedicationRequest, IPractitioner]): IEntryLine => {
    const medicationRequest = entry[0];
    const author = entry[1].name
        ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual)
        : null;

    return {
        date: medicationRequest.authoredOn,
        text: medicationRequest.medicationCodeableConcept?.text,
        type: "Resept",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
        details: medicationRequestToDetails(medicationRequest),
    } as IEntryLine;
};

const questionnaireResponseToEntry = (
    entry: [IQuestionnaireResponse, IPractitioner]
): IEntryLine => {
    const questionnaireResponse = entry[0];
    const author = entry[1].name
        ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual)
        : null;

    return {
        date: questionnaireResponse.authored,
        text: questionnaireResponse.subject?.display,
        type: "Skjema",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
    } as IEntryLine;
};
