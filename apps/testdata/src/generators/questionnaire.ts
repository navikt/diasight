import {
    IQuestionnaire,
    IQuestionnaire_Item,
    Questionnaire_ItemTypeKind,
    QuestionnaireStatusKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";

export const generateQuestionnaire = (): IQuestionnaire => {
    const items: IQuestionnaire_Item[] = [
        {
            linkId: "the-first-item",
            type: Questionnaire_ItemTypeKind._string,
            text: "Hva hadde du til middag?",
        },
        {
            linkId: "the-second-item",
            type: Questionnaire_ItemTypeKind._string,
            text: "Hva heter favoritt artisten din?",
        },
    ];

    return {
        id: "13acde7c-96a0-494c-aba2-7658fc32cc5a",
        name: "Test Questionnaire",
        resourceType: "Questionnaire",
        status: QuestionnaireStatusKind._draft,
        item: items,
    };

};
