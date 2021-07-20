import { HumanNameUseKind, IAppointment, IDiagnosticReport, IMedicationRequest, IObservation, IPractitioner, IQuestionnaireResponse, IServiceRequest } from "@ahryman40k/ts-fhir-types/lib/R4";
import { filterHumanNameOnUse, humanNameToString } from "../../../utils";
import { IEntryWithAuthor } from "../hooks/use-patient-entry";

interface IEntryLine {
    date: string;
    text: string;
    type: string;
    author: string;
    department: string;
}

export const bundleToEntry = (bundle: IEntryWithAuthor): IEntryLine => {
    const resourceType = bundle[0].resourceType;

    switch (resourceType) {
        case "Observation":
            return observationToEntry(bundle as [IObservation, IPractitioner]);
        case "MedicationRequest":
            return medicationRequestToEntry(bundle as [IMedicationRequest, IPractitioner]);
        /*case "DiagnosticReport":
    return entry as IDiagnosticReport;
case "QuestionnaireResponse":
    return entry as IQuestionnaireResponse;
case "Appointment":
    return entry as IAppointment;*/
        case "ServiceRequest":
            return serviceRequestToEntry(bundle as [IServiceRequest, IPractitioner]);
        default:
            return {
                date: "0000-00-00",
                text: "Ukjent",
                type: "Ukjent",
                author: "Ukjent",
                department: "Ukjent"
            };
    }


}

const observationToEntry = (entry: [IObservation, IPractitioner]): IEntryLine => {

    const observation = entry[0];
    const author = entry[1].name ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual) : null;

    return {
        date: observation.issued,
        text: observation.code.text,
        type: "Observasjon",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
    } as IEntryLine;

}

const serviceRequestToEntry = (entry: [IServiceRequest, IPractitioner]): IEntryLine => {

    const serviceRequest = entry[0];
    const author = entry[1].name ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual) : null;

    return {
        date: serviceRequest.authoredOn,
        text: serviceRequest.code?.text,
        type: "Henvisning",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
    } as IEntryLine;
}

const medicationRequestToEntry = (entry: [IMedicationRequest, IPractitioner]): IEntryLine => {

    const medicationRequest = entry[0];
    const author = entry[1].name ? filterHumanNameOnUse(entry[1].name, HumanNameUseKind._usual) : null;

    return {
        date: medicationRequest.authoredOn,
        text: medicationRequest.medicationCodeableConcept?.text,
        type: "Resept",
        author: author ? humanNameToString(author) : "Ukjent",
        department: "Midlertidig",
    } as IEntryLine;
}