import React, { useContext, useState } from "react";
import { FC } from "react";
import style from "../composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "../hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { Timeline } from "./timeline";
import { CompositionContext } from "../../../layouts/contexts/composition-context";
import { findICPCCode } from "../utils/find-ICPC";

interface IProps {
    title: string;
    focus: IReference;
    entries: IReference[] | undefined;
}

export const Condition: FC<IProps> = ({ title, focus, entries }) => {
    const { condition, isLoading, isError } = usePatientCondition(focus);
    const { toggleCondition } = useContext(CompositionContext);
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        setExpanded(!expanded);
        toggleCondition(focus);
    };

    console.log(focus)

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
                <Timeline entries={entries} isActive={expanded} condition={focus} />
            </>
        );
    }

    return null;
};
