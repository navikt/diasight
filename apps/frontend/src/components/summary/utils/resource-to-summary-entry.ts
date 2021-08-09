import {
    IObservation,
    IQuestionnaireResponse,
    IQuestionnaireResponse_Answer,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";

type SummaryEntry = {
    title: string;
    subject: string;
    descriptors: string[];
};

export const resourceToSummaryEntry = (resource: IResourceList): SummaryEntry => {
    switch (resource.resourceType) {
        case "QuestionnaireResponse":
            return questionnaireResponseToSummaryEntry(resource);
        case "Observation":
            return observationToSummaryEntry(resource);
        default:
            return {
                title: "Ukjent",
                subject: "ID",
                descriptors: [],
            };
    }
};

const observationToSummaryEntry = (observation: IObservation): SummaryEntry => {
    const note = observation.note?.find((note) => note)?.text || "";
    //const actor = observation.performer?.find((performer) => performer)?.display || "Ukjent";

    return {
        title: "Ny observasjon",
        subject: "",
        descriptors: [note],
    };
};

const questionnaireResponseToSummaryEntry = (
    questionnaireResponse: IQuestionnaireResponse
): SummaryEntry => {
    const summaryEntry: SummaryEntry = {
        title: questionnaireResponse.subject?.display || "Nytt skjema",
        subject: "",
        descriptors: [],
    };

    questionnaireResponse.item?.map((item) => {
        const answer = item.answer?.find((answer) => {
            if (answer.valueReference?.display) {
                return answer;
            } else if (!answer.valueReference) {
                return answer;
            }
            return false;
        });
        if (!answer) return;
        const text = `${item.text}: ${answerToString(answer)}`;

        summaryEntry.descriptors.push(text);
    });

    return summaryEntry;
};

const answerToString = (answer: IQuestionnaireResponse_Answer) => {
    let text = "";
    text += answer.valueBoolean || "";
    text += answer.valueDate || "";
    text += answer.valueInteger || "";
    text += answer.valueReference?.display || "";
    text += answer.valueString || "";

    console.log(answer);

    return text;
};
