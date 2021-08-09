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
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import { v4 } from "uuid";
import { SelectionContext } from "../../layouts/contexts/selection-context";

interface IProps {
    id: number;
    patient: IPatient;
}

const initialQuestionnaireResponse: IQuestionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    id: "urn:uuid:" + v4(),
    authored: new Date().toISOString(),
    author: { reference: "Practitioner/2" },
    item: [],
};

export const Questionnaire: FC<IProps> = ({ id, patient }) => {
    const { questionnaire, isLoading, isError } = useQuestionnaire(id);

    const { addResource, updateResource, findResourceByType } = useContext(SummaryContext);
    const { selections } = useContext(SelectionContext);

    const [answers, setAnswers] = useState<IQuestionnaireResponse>(initialQuestionnaireResponse);
    const [hasChanged, setHasChanged] = useState(false);
    const [error, setError] = useState(false);

    const handleAnswer = (
        answer: IQuestionnaireResponse_Answer[],
        linkId: string,
        text: string
    ) => {
        setHasChanged(true);

        const updatedResponse = { ...answers };
        const responseItem = updatedResponse.item?.find((i) => i.linkId === linkId);

        if (!responseItem) {
            updatedResponse.item?.push({ linkId, answer, text });
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
            setError(true);
            return;
        } else {
            setError(false);
            setHasChanged(false);
            selections.map(({ composition, condition }) => {
                if (findResourceByType(composition, condition, "QuestionnaireResponse")) {
                    updateResource(composition, condition, answers);
                } else {
                    addResource(composition, condition, answers);
                }
            });
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
                        const text = question.text || "";
                        const value = getAnswer(linkId) || [];
                        const change = (answer: IQuestionnaireResponse_Answer[]) => {
                            handleAnswer(answer, linkId, text);
                        };

                        return generateFHIRForm(question, value, change);
                    })}
                    {error ? (
                        <AlertStripeFeil>
                            Vennligst fyll ut alle feltene med stjerne (*) før du fortsetter.
                        </AlertStripeFeil>
                    ) : null}
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
