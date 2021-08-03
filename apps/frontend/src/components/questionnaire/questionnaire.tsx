import {
    IPatient,
    IQuestionnaireResponse,
    IQuestionnaireResponse_Answer,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { Close } from "@navikt/ds-icons/cjs";
import { Normaltekst, Systemtittel, Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { useContext, useState } from "react";
import { FC } from "react";
import { useQuestionnaire } from "./hooks/use-questionnaire";
import style from "./questionnaire.module.less";
import { generateFHIRForm } from "./utils/generate-form";

interface IProps {
    id: number;
    patient: IPatient;
}

const initialQuestionnaireResponse: IQuestionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    item: [],
};

export const Questionnaire: FC<IProps> = ({ id, patient }) => {
    const [answers, setAnswers] = useState<IQuestionnaireResponse>(initialQuestionnaireResponse);
    const { questionnaire, isLoading, isError } = useQuestionnaire(id);

    const handleAnswer = (answer: IQuestionnaireResponse_Answer, linkId: string) => {
        const updatedResponse = { ...answers };
        const responseItem = updatedResponse.item?.find((i) => i.linkId === linkId);

        if (!responseItem) {
            updatedResponse.item?.push({ linkId: linkId, answer: [answer] });
            setAnswers(updatedResponse);
            return;
        }

        const filteredItems = updatedResponse.item?.filter((item) => item !== responseItem) || [];
        responseItem.answer = [answer];

        updatedResponse.item = [...filteredItems, responseItem];
        setAnswers(updatedResponse);
        console.log(answers);
    };

    const getAnswer = (linkId: string) => {
        return answers.item?.find((item) => item.linkId === linkId)?.answer;
    };

    const date = new Date();

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (questionnaire) {
        return (
            <div className={style.wrapper}>
                <div className={style.header}>
                    <Undertittel>{questionnaire.title}</Undertittel>
                    <Close />
                </div>
                <form>
                    <Systemtittel className={style.fullSpan}>{questionnaire.title}</Systemtittel>
                    <Normaltekst className={style.fullSpan}>
                        {questionnaire.title} gjelder for Ola Normann født {patient.birthDate}.
                    </Normaltekst>
                    {questionnaire.item?.map((question) => {
                        if (!question.linkId) return null;
                        const linkId = question.linkId;
                        const value = getAnswer(linkId) || [];
                        const change = (answer: IQuestionnaireResponse_Answer) => {
                            handleAnswer(answer, linkId);
                        };

                        return generateFHIRForm(question, value, change);
                    })}
                    <div className={style.signature}>
                        <Undertittel>Dr. Nystøl</Undertittel>
                        <Undertekst>Overlege</Undertekst>
                        <Undertekst>Oslo legekontor</Undertekst>
                    </div>
                </form>
            </div>
        );
    }
    return <p></p>;
};
