import React, { useContext, useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { CoApplicantFilled, EditFilled, Expand, EyeFilled, Collapse } from "@navikt/ds-icons/cjs";
import { IComposition_Section, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Timeline } from "./timeline";
import { CompositionContext } from "../../layouts/contexts/composition-context";
import { BiCondition } from "./bi-condition";

interface IProps {
    conditionRef: IReference;
    entries: IReference[] | undefined;
    biConditions: IComposition_Section[];
}

export const MainCondition: FC<IProps> = ({ conditionRef, entries, biConditions }) => {
    const { condition, isLoading, isError } = usePatientCondition(conditionRef);
    const { toggleMainCondition } = useContext(CompositionContext);
    const [expanded, setExpanded] = useState(false);

    const toggleCondition = () => {
        setExpanded(!expanded);
        toggleMainCondition(conditionRef);
    };

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (condition?.code?.coding) {
        return (
            <>
                <div className={`${style.mainCondition} ${expanded ? style.active : ""}`}>
                    <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
                    <EyeFilled />
                    <CoApplicantFilled />
                    <EditFilled />
                    <Undertittel>{condition.code.text}</Undertittel>
                    <Normaltekst>{condition.onsetDateTime}</Normaltekst>
                    <div className={style.expand} onClick={() => toggleCondition()}>
                        {expanded ? <Expand /> : <Collapse />}
                    </div>
                </div>
                <Timeline entries={entries} isActive={expanded} mainRef={conditionRef} />
                {biConditions.map((value, index) => {
                    if (!value.focus) return null;
                    return (
                        <BiCondition
                            key={index}
                            mainRef={conditionRef}
                            biRef={value.focus}
                            entries={value.entry}
                            visible={expanded}
                        />
                    );
                })}
            </>
        );
    }

    return null;
};
