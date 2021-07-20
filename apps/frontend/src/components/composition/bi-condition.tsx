import React, { useContext, useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { Timeline } from "./timeline";
import { CompositionContext } from "../../layouts/contexts/composition-context";

interface IProps {
    conditionRef: IReference;
    entries: IReference[] | undefined;
}

export const BiCondition: FC<IProps> = ({ conditionRef, entries }) => {

    const { condition, isLoading, isError } = usePatientCondition(conditionRef);
    const { references, toggleReference } = useContext(CompositionContext);
    const [expanded, setExpanded] = useState(false);

    const toggleCondition = () => {
        setExpanded(!expanded);
        toggleReference(conditionRef);
    }

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (condition?.code?.coding) {
        return (
            <>
                <div className={`${style.biCondition} ${expanded ? style.active : ""}`}>
                    <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
                    <Element className={style.name}>{condition.code.text}</Element>
                    <div className={style.expand} onClick={() => toggleCondition()}>
                        {expanded ? <Expand /> : <Collapse />}
                    </div>
                </div>
                <Timeline entries={entries} isActive={expanded} />
            </>
        );
    }

    return null;
};
