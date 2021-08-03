import React, { FC } from "react";
import { Element, Undertekst } from "nav-frontend-typografi";
import { Condition } from "./condition";
import { IComposition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import style from "../composition.module.less";

interface IProps {
    composition: IComposition;
}

/*
 * One composition consists of a condition (focus of the composition) and several other resources (entries) such as appointments,
 * adverse-events, and procedures.
 */

export const Composition: FC<IProps> = ({ composition }) => {
    return (
        <div className={style.composition}>
            <div className={style.date}>
                <div>
                    <Undertekst>Sist oppdatert</Undertekst>
                    <Element>{composition.meta?.lastUpdated?.substr(0, 10)}</Element>
                </div>
                <div>
                    <Undertekst>Opprettet </Undertekst>
                    <Element>{composition.date}</Element>
                </div>
            </div>
            {composition.section?.map((comp, index) => {
                if (!comp.title || !comp.focus) return null;
                return (
                    <Condition
                        key={index}
                        title={comp.title}
                        composition={composition}
                        focus={comp.focus}
                        entries={comp.entry}
                    />
                );
            })}
        </div>
    );
};
