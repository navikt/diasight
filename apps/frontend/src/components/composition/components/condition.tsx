import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import style from "../composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IComposition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "../hooks/use-patient-condition";
import { Normaltekst, Element, Undertekst } from "nav-frontend-typografi";
import { Timeline } from "./timeline";
import { findICPCCode } from "../utils/find-ICPC";
import { SelectionContext } from "../../../layouts/contexts/selection-context";

interface IProps {
    title: string;
    composition: IComposition;
    focus: IReference;
    entries: IReference[] | undefined;
}

export const Condition: FC<IProps> = ({ title, composition, focus, entries }) => {
    const { condition, isLoading, isError } = usePatientCondition(focus);
    const { toggleCondition, findSelection } = useContext(SelectionContext);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!condition) return;

        const selection = findSelection(condition, composition);

        if (selection) setExpanded(true);
    }, [condition]);

    const toggle = () => {
        if (!condition) return;

        setExpanded(!expanded);
        toggleCondition(condition, composition);
    };

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (condition) {
        return (
            <>
                <div className={`${style.condition} ${expanded ? style.active : ""}`}>
                    <Undertekst className={style.conditionCode}>
                        {condition.code ? findICPCCode(condition.code)?.code : "????"}
                    </Undertekst>
                    <Element className={style.name}>{title}</Element>
                    <div className={style.expand} onClick={() => toggle()}>
                        {expanded ? <Collapse /> : <Expand />}
                    </div>
                </div>
                <Timeline
                    entries={entries}
                    isActive={expanded}
                    condition={condition}
                    composition={composition}
                />
            </>
        );
    }

    return null;
};
