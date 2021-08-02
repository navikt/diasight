import React, { useContext, useState } from "react";
import { FC } from "react";
import style from "../composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IComposition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "../hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";
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
    const { toggleCondition } = useContext(SelectionContext);
    const [expanded, setExpanded] = useState(false);

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
                    <Normaltekst>
                        {condition.code ? findICPCCode(condition.code)?.code : "????"}
                    </Normaltekst>
                    <Element className={style.name}>{title}</Element>
                    <div className={style.expand} onClick={() => toggle()}>
                        {expanded ? <Expand /> : <Collapse />}
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
