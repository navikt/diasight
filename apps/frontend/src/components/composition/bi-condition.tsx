import React, { useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { Timeline } from "./timeline";

interface IProps {
    conditionID: number;
    entries: IReference[] | undefined;
}

export const BiCondition: FC<IProps> = ({ conditionID, entries }) => {
    const { condition, isLoading, isError } = usePatientCondition(conditionID);
    const [expanded, setExpanded] = useState(false);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (condition?.code?.coding) {
        return (
            <>
                <div className={style.biCondition}>
                    <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
                    <Element className={style.name}>{condition.code.text}</Element>
                    <div className={style.expand} onClick={() => setExpanded(!expanded)}>
                        {expanded ? <Expand /> : <Collapse />}
                    </div>
                </div>
                <Timeline entries={entries} isActive={expanded} />
            </>
        );
    }

    return null;
};
