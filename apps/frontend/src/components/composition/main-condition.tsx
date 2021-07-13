import React, { useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { CoApplicantFilled, EditFilled, Expand, EyeFilled, Collapse } from "@navikt/ds-icons";
import { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Element, Undertittel } from "nav-frontend-typografi";

interface IProps {
    conditionID: number;
}

export const MainCondition: FC<IProps> = ({ conditionID }) => {
    const { condition, isLoading, isError } = usePatientCondition(conditionID);
    const [expanded, setExpanded] = useState(false);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    return (
        <div className={style.mainCondition}>
            <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
            <EyeFilled />
            <CoApplicantFilled />
            <EditFilled />
            <Undertittel>{condition.code.text}</Undertittel>
            <Normaltekst>{condition.onsetDateTime}</Normaltekst>
            <div className={style.expand} onClick={() => setExpanded(!expanded)}>
                {expanded ? <Expand /> : <Collapse />}
            </div>
        </div>
    );
};
