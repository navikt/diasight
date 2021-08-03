import {
    IQuestionnaireResponse_Answer,
    IQuestionnaire_Item,
    Questionnaire_ItemTypeKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React from "react";
import { Checkbox, Input, Select, Textarea } from "nav-frontend-skjema";
import { Datepicker } from "nav-datovelger/";
import { Entry } from "../components/entry";
import { Element } from "nav-frontend-typografi";

import style from "../questionnaire.module.less";

export const generateFHIRForm = (
    question: IQuestionnaire_Item,
    value: IQuestionnaireResponse_Answer[],
    setValue: (answer: IQuestionnaireResponse_Answer) => void
) => {
    switch (question.type) {
        case Questionnaire_ItemTypeKind._string:
            return (
                <Input
                    type="text"
                    label={question.text}
                    key={question.linkId}
                    value={value.find((v) => v.valueString)?.valueString || ""}
                    onChange={(e) => setValue({ valueString: e.target.value })}
                />
            );
        case Questionnaire_ItemTypeKind._text:
            return (
                <Textarea
                    value={value.find((v) => v.valueString)?.valueString || ""}
                    onChange={(e) => setValue({ valueString: e.target.value })}
                    label={question.text}
                    defaultValue={""}
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
                    label={question.text}
                    key={question.linkId}
                />
            );
        case Questionnaire_ItemTypeKind._date:
            return (
                <div className={style.dateInput}>
                    <Element>{question.text}</Element>
                    <Datepicker
                        value={value.find((v) => v.valueDate)?.valueDate || ""}
                        onChange={(value) => setValue({ valueDate: value })}
                    />
                </div>
            );
        case Questionnaire_ItemTypeKind._choice:
            return (
                <Select
                    label={question.text}
                    key={question.linkId}
                    value={value.find((v) => v.valueString)?.valueString || ""}
                    onChange={(e) => setValue({ valueString: e.target.value })}>
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
                    label={question.text}
                    key={question.linkId}
                    checked={value.find((v) => v.valueBoolean)?.valueBoolean || false}
                    onChange={(e) => setValue({ valueBoolean: e.target.checked })}
                />
            );
        case Questionnaire_ItemTypeKind._reference:
            return <Entry key={question.linkId} />;
        default:
            return null;
    }
};
