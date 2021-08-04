import {
    IPatient,
    IQuestionnaireResponse,
    IQuestionnaireResponse_Answer,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { Close } from "@navikt/ds-icons/cjs";
import { Normaltekst, Systemtittel, Undertekst, Undertittel } from "nav-frontend-typografi";
import { Knapp } from "nav-frontend-knapper";
import React, { FormEvent, useContext, useState } from "react";
import { FC } from "react";
import { useQuestionnaire } from "./hooks/use-questionnaire";
import style from "./questionnaire.module.less";
import { generateFHIRForm } from "./utils/generate-form";
import { getInvalidQuestionnaireResponseItems } from "./utils/validate-questionnaire-response";

interface IProps {
    id: number;
    patient: IPatient;
}

const initialQuestionnaireResponse: IQuestionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    authored: new Date().toISOString(),
    item: [],
};

export const Questionnaire: FC<IProps> = ({ id, patient }) => {
    const [hasChanged, setHasChanged] = useState(false);
    const [answers, setAnswers] = useState<IQuestionnaireResponse>(initialQuestionnaireResponse);
    const { questionnaire, isLoading, isError } = useQuestionnaire(id);

    const handleAnswer = (answer: IQuestionnaireResponse_Answer[], linkId: string) => {
        setHasChanged(true);

        const updatedResponse = { ...answers };
        const responseItem = updatedResponse.item?.find((i) => i.linkId === linkId);

        if (!responseItem) {
            updatedResponse.item?.push({ linkId: linkId, answer: answer });
            setAnswers(updatedResponse);
            return;
        }

        const filteredItems = updatedResponse.item?.filter((item) => item !== responseItem) || [];
        responseItem.answer = answer;

        updatedResponse.item = [...filteredItems, responseItem];
        setAnswers(updatedResponse);
    };

    const getAnswer = (linkId: string) => {
        return answers.item?.find((item) => item.linkId === linkId)?.answer;
    };

    const saveForm = (e: FormEvent) => {
        e.preventDefault();

        if (!questionnaire) return;

        const invalidItems = getInvalidQuestionnaireResponseItems(answers, questionnaire);

        if (invalidItems.length > 0) {
            console.log(invalidItems);
            console.log(answers);

            return;
        } else {
            setHasChanged(false);
            console.log(answers);
        }
    };

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (questionnaire) {
        return (
            <div className={style.wrapper}>
                <div className={style.header}>
                    <Undertittel>{questionnaire.title}</Undertittel>
                    <Close />
                </div>
                <form onSubmit={(e) => saveForm(e)}>
                    <Systemtittel>{questionnaire.title}</Systemtittel>
                    <Normaltekst>Dato {answers.authored?.slice(0, 10)}</Normaltekst>
                    <Normaltekst>
                        {questionnaire.title} gjelder for Ola Normann født {patient.birthDate}.
                    </Normaltekst>
                    {questionnaire.item?.map((question) => {
                        if (!question.linkId) return null;
                        const linkId = question.linkId;
                        const value = getAnswer(linkId) || [];
                        const change = (answer: IQuestionnaireResponse_Answer[]) => {
                            handleAnswer(answer, linkId);
                        };

                        return generateFHIRForm(question, value, change);
                    })}
                    <div className={style.formFooter}>
                        <Knapp disabled={!hasChanged} htmlType="submit">
                            Lagre
                        </Knapp>
                        <div className={style.signature}>
                            <Undertittel>Dr. Nystøl</Undertittel>
                            <Undertekst>Overlege</Undertekst>
                            <Undertekst>Oslo legekontor</Undertekst>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    return <p></p>;
};
