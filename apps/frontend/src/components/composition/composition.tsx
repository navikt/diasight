import React, { FC } from "react";
import { usePatientComposition } from "./hooks/use-patient-composition";
import { BiCondition } from "./bi-condition";
import { MainCondition } from "./main-condition";
import { Timeline } from "./timeline";
import { idToNumber } from "./utils/idToNumber";
import { Normaltekst } from "nav-frontend-typografi";
import style from "./composition.module.less";

interface IProps {
    patientID: number;
}

/*
 * One composition consists of a condition (primary section of the composition) and several other resources (nested sections of the condition) such as appointments,
 * adverse-events, and procedures.
 */

// TODO: Create bundle component. Figure out what data is shared between resources for better readability.

export const Composition: FC<IProps> = ({ patientID }) => {
    const { composition, isLoading, isError } = usePatientComposition(patientID);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (composition) {
        return (
            <div className={style.compositionWrapper}>
                {
                    composition.section?.map((condition, mIndex) => {
                        if (!condition.focus?.reference || !condition.section?.length || !condition.entry) return null;
                        return (
                            <div>
                                <MainCondition key={mIndex} conditionID={idToNumber(condition.focus.reference)} entries={condition.entry} />
                                {condition.section.map((value, bIndex) => {
                                    if (!value.focus?.reference) return null;
                                    const key = mIndex + "B" + bIndex;
                                    return (
                                        <BiCondition key={key} conditionID={idToNumber(value.focus.reference)} entries={value.entry} />
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
