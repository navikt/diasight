import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
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
type AnswerType = {
    linkId: string;
    answer: string;
};

export const Questionnaire: FC<IProps> = ({ id, patient }) => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const { questionnaire, isLoading, isError } = useQuestionnaire(id);

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
                <form onSubmit={() => console.log("Hallo")}>
                    <Systemtittel>{questionnaire.title}</Systemtittel>
                    <Normaltekst>
                        {questionnaire.title} gjelder for Ola Normann født {patient.birthDate}.
                    </Normaltekst>
                    {questionnaire.item?.map((value) => {
                        return generateFHIRForm(value);
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
