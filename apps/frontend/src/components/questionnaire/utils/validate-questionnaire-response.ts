import {
    IQuestionnaire,
    IQuestionnaireResponse,
    IQuestionnaireResponse_Answer,
    IQuestionnaireResponse_Item,
    IQuestionnaire_Item,
    Questionnaire_ItemTypeKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { isISODateString } from "nav-datovelger";

export const getInvalidQuestionnaireResponseItems = (
    response: IQuestionnaireResponse,
    questionnaire: IQuestionnaire
) => {
    const invalidResponses: IQuestionnaire_Item[] = [];

    questionnaire.item?.map((item) => {
        if (item.required && item.type) {
            const responseItem = response.item?.find((i) => i.linkId === item.linkId);
            const answer = responseItem?.answer?.find((a) => a);
            if (!validateResponseItemNotEmpty(item.type, answer)) {
                invalidResponses.push(item);
            }
        }
    });

    return invalidResponses;
};

const validateResponseItemNotEmpty = (
    type: Questionnaire_ItemTypeKind,
    answer: IQuestionnaireResponse_Answer | undefined
) => {
    if (!answer) return false;
    switch (type) {
        case Questionnaire_ItemTypeKind._boolean:
            return answer.valueBoolean !== undefined;
        case Questionnaire_ItemTypeKind._choice:
            return answer.valueString !== "";
        case Questionnaire_ItemTypeKind._date:
            return isISODateString(answer.valueDate);
        case Questionnaire_ItemTypeKind._integer:
            return typeof answer.valueInteger === "number";
        case Questionnaire_ItemTypeKind._string:
            return answer.valueString !== "";
        case Questionnaire_ItemTypeKind._text:
            return answer.valueString !== "";
        case Questionnaire_ItemTypeKind._reference:
            return answer.valueReference?.reference;
        default:
            return false;
    }
};
