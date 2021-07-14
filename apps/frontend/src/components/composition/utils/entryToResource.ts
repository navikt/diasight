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

export const extractDataFromEntry = (bundle: IEntryWithAuthor): IEntryLine => {
    console.log(bundle);
    const resourceType = bundle[0].resourceType;

    switch (resourceType) {
        case "Observation":
            return observationToEntry(bundle as [IObservation, IPractitioner]);
        /*case "DiagnosticReport":
            return entry as IDiagnosticReport;
        case "MedicationRequest":
            return entry as IMedicationRequest;
        case "QuestionnaireResponse":
            return entry as IQuestionnaireResponse;
        case "Appointment":
            return entry as IAppointment;
        case "ServiceRequest":
            return entry as IServiceRequest;*/
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