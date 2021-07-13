import React, { useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons";
import { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";

interface IProps {
    conditionID: number;
}

// NEXT COMPONENT: drop down timeline/table under each condition component, same look. 

export const BiCondition: FC<IProps> = ({ conditionID }) => {
    const { condition, isLoading, isError } = usePatientCondition(conditionID);
    const [expanded, setExpanded] = useState(false);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    return (
        <div className={style.biCondition}>
            <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
            <Element className={style.name}>{condition.code.text}</Element>
            <div className={style.expand} onClick={() => setExpanded(!expanded)}>
                {expanded ? <Expand /> : <Collapse />}
            </div>
        </div>
    );
};
