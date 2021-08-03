import {
    IQuestionnaire,
    IQuestionnaire_Item,
    Questionnaire_ItemTypeKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React from "react";
import {
    Checkbox,
    Input,
    Label,
    Radio,
    RadioGruppe,
    Select,
    TextareaControlled,
} from "nav-frontend-skjema";
import AlertStripe from "nav-frontend-alertstriper";
import { Entry } from "../components/entry";

export const generateFHIRForm = (question: IQuestionnaire_Item) => {
    switch (question.type) {
        case Questionnaire_ItemTypeKind._string:
            return <Input type="text" label={question.text} key={question.linkId} />;
        case Questionnaire_ItemTypeKind._text:
            return (
                <TextareaControlled
                    label={question.text}
                    defaultValue={""}
                    maxLength={0}
                    key={question.linkId}
                />
            );
        case Questionnaire_ItemTypeKind._integer:
            return (
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    label={question.text}
                    key={question.linkId}
                />
            );
        case Questionnaire_ItemTypeKind._choice:
            return (
                <Select label={question.text} key={question.linkId}>
                    <option value="">Velg</option>
                    {question.answerOption?.map((option, index) => {
                        return (
                            <option value={option.valueString} key={index}>
                                {option.valueString}
                            </option>
                        );
                    })}
                </Select>
            );
        case Questionnaire_ItemTypeKind._boolean:
            return <Checkbox label={question.text} key={question.linkId} />;
        case Questionnaire_ItemTypeKind._reference:
            return <Entry key={question.linkId} />;
        default:
            return null;
    }
};
