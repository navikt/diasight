import React, { FC } from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Condition } from "./condition";
import { IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

interface IProps {
    composition: IComposition;
}

/*
 * One composition consists of a condition (focus of the composition) and several other resources (entries) such as appointments,
 * adverse-events, and procedures.
 */

export const Composition: FC<IProps> = ({ composition }) => {
    return (
        <div>
            {composition.section?.map((comp, index) => {
                if (!comp.title || !comp.focus) return null;
                return (
                    <Condition
                        key={index}
                        title={comp.title}
                        focus={comp.focus}
                        entries={comp.entry}
                    />
                );
            })}
        </div>
    );

    /*
    if (compositions) {
        return (
            <div className={style.compositionWrapper}>
                <Undertittel>Diagnostikk</Undertittel>
                {compositions.section?.map((condition, mIndex) => {
                    if (!condition.focus || !condition.section?.length || !condition.entry)
                        return null;
                    return (
                        <div key={mIndex}>
                            <MainCondition
                                key={mIndex}
                                conditionRef={condition.focus}
                                entries={condition.entry}
                                biConditions={condition.section}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }*/

    return (
        <div>
            <Normaltekst>Fant ingen resultater</Normaltekst>
        </div>
    );
};
