import { Close } from "@navikt/ds-icons/cjs";
import { Undertittel } from "nav-frontend-typografi";
import React, { useContext, useState } from "react";
import { FC } from "react";
import { useQuestionnaire } from "./hooks/use-questionnaire";
import { Input } from "nav-frontend-skjema";
import style from "./questionnaire.module.less";
import { generateFHIRForm } from "./utils/generate-form";
import { CompositionContext } from "../../layouts/contexts/composition-context";
import { Entry } from "./components/entry";

interface IProps {
    id: number;
}
type AnswerType = {
    linkId: string;
    answer: string;
};

export const Questionnaire: FC<IProps> = ({ id }) => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const { questionnaire, isLoading, isError } = useQuestionnaire(id);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (questionnaire) {
        return (
            <div className={style.wrapper}>
                <div className={style.header}>
                    <Undertittel>Legeerklæring</Undertittel>
                    <Close />
                </div>
                <form onSubmit={() => console.log("Hallo")}>
                    {questionnaire.item?.map((value) => {
                        return generateFHIRForm(value);
                    })}
                    <input type="submit" value="SEND" className="knapp" />
                </form>
            </div>
        );
    }
    return <p></p>;
};
