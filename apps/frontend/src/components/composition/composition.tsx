import React, { FC } from "react";
import { usePatientComposition } from "./hooks/use-patient-composition";
import { BiCondition } from "./bi-condition";
import { MainCondition } from "./main-condition";
import { idToNumber } from "./utils/idToNumber";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import style from "./composition.module.less";

interface IProps {
    patientID: number;
}

/*
 * One composition consists of a condition (focus of the composition) and several other resources (entries) such as appointments,
 * adverse-events, and procedures.
 */

export const Composition: FC<IProps> = ({ patientID }) => {
    const { composition, isLoading, isError } = usePatientComposition(patientID);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (composition) {
        return (
            <div className={style.compositionWrapper}>
                <Undertittel>Diagnostikk</Undertittel>
                {
                    composition.section?.map((condition, mIndex) => {
                        if (!condition.focus?.reference || !condition.section?.length || !condition.entry) return null;
                        return (
                            <div key={mIndex}>
                                <MainCondition key={mIndex} conditionRef={condition.focus} entries={condition.entry} />
                                {condition.section.map((value, bIndex) => {
                                    if (!value.focus?.reference) return null;
                                    return (
                                        <BiCondition key={bIndex} conditionRef={value.focus} entries={value.entry} />
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        );
    }

    return (
        <div>
            <Normaltekst>Fant ingen resultater</Normaltekst>
        </div>
    );
};
