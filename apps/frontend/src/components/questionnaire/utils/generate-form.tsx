import {
    IQuestionnaireResponse_Answer,
    IQuestionnaire_Item,
    Questionnaire_ItemTypeKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React from "react";
import { Checkbox, Input, Select, Textarea } from "nav-frontend-skjema";
import { Datepicker, isISODateString } from "nav-datovelger/";
import { Entry } from "../components/entry";
import { Element } from "nav-frontend-typografi";

import style from "../questionnaire.module.less";

export const generateFHIRForm = (
    question: IQuestionnaire_Item,
    value: IQuestionnaireResponse_Answer[],
    setValue: (answer: IQuestionnaireResponse_Answer[]) => void
) => {
    const v = value.find((v) => v);

    switch (question.type) {
        case Questionnaire_ItemTypeKind._string:
            return (
                <Input
                    type="text"
                    label={`${question.text}${question.required ? "*" : ""}`}
                    required={question.required || false}
                    key={question.linkId}
                    value={v?.valueString || ""}
                    onChange={(e) => setValue([{ valueString: e.target.value }])}
                />
            );
        case Questionnaire_ItemTypeKind._text:
            return (
                <Textarea
                    value={v?.valueString || ""}
                    onChange={(e) => setValue([{ valueString: e.target.value }])}
                    label={`${question.text}${question.required ? "*" : ""}`}
                    required={question.required || false}
                    maxLength={0}
                    key={question.linkId}
                />
            );
        case Questionnaire_ItemTypeKind._integer:
            return (
                <Input
                    // Missing: handle state
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    label={`${question.text}${question.required ? "*" : ""}`}
                    required={question.required || false}
                    key={question.linkId}
                />
            );
        case Questionnaire_ItemTypeKind._date:
            return (
                <div className={style.dateInput} key={question.linkId}>
                    <Element>{`${question.text}${question.required ? "*" : ""}`}</Element>
                    <Datepicker
                        value={v?.valueDate || ""}
                        onChange={(value) => setValue([{ valueDate: value }])}
                        inputProps={{
                            "aria-invalid":
                                v?.valueDate === "" && isISODateString(v?.valueDate) === false,
                        }}
                    />
                </div>
            );
        case Questionnaire_ItemTypeKind._choice:
            return (
                <Select
                    label={`${question.text}${question.required ? "*" : ""}`}
                    required={question.required || false}
                    key={question.linkId}
                    value={v?.valueString || ""}
                    onChange={(e) => setValue([{ valueString: e.target.value }])}>
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
            return (
                <Checkbox
                    label={`${question.text}${question.required ? "*" : ""}`}
                    key={question.linkId}
                    required={question.required || false}
                    checked={v?.valueBoolean || false}
                    onChange={(e) => setValue([{ valueBoolean: e.target.checked }])}
                />
            );
        case Questionnaire_ItemTypeKind._reference:
            return (
                <Entry
                    values={value}
                    onChange={setValue}
                    required={question.required || false}
                    key={question.linkId}
                />
            );
        default:
            return null;
    }
};
