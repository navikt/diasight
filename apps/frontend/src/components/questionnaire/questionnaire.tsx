import { IQuestionnaire, Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4'
import React, { useState } from 'react'
import { FC } from 'react'
import { Answer } from '../itemAnswer/itemAnswer'

interface IProps {
    questionnaire: IQuestionnaire;
}
type AnswerType = {
    linkId: string;
    answer: string;
}

export const Questionnaire: FC<IProps> = ({ questionnaire }) => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);

    const setAnswer = (linkId: string) => {
        return (answer: string) => {
            const results = [...answers];
            const foundIndex = answers.findIndex(i => i.linkId === linkId);
            if (foundIndex) {
                results[foundIndex] = { linkId, answer };
            } else {
                results.push({ linkId, answer })
            }
            setAnswers(results);
        }

    }

    const findAnswer = (linkId: string) => {
        const found = answers.find((i: AnswerType) => i.linkId === linkId)
        if (found) {
            return found.answer

        } else {
            return ""
        }

    }

    if (questionnaire) {
        return (
            <div>
                {
                    questionnaire.item?.map((value) => {
                        return (
                            value.linkId ?
                                <div key={value.linkId}>
                                    <p>{value.text}</p>
                                    <Answer answer={findAnswer(value.linkId)} setAnswer={setAnswer(value.linkId)} />
                                </div> : null
                        )
                    })
                }

            </div>
        )
    }
    return (
        <p></p>
    )
}