import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import style from "./composition.module.less";
import { Expand, Collapse } from "@navikt/ds-icons/cjs";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { usePatientCondition } from "./hooks/use-patient-condition";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { Timeline } from "./timeline";
import { CompositionContext } from "../../layouts/contexts/composition-context";

interface IProps {
    biRef: IReference;
    mainRef: IReference;
    entries: IReference[] | undefined;
    visible: boolean;
}

export const BiCondition: FC<IProps> = ({ biRef, mainRef, entries, visible = false }) => {
    const { condition, isLoading, isError } = usePatientCondition(biRef);
    const { toggleBiCondition } = useContext(CompositionContext);
    const [expanded, setExpanded] = useState(false);

    const toggleCondition = () => {
        setExpanded(!expanded);
        toggleBiCondition(biRef, mainRef);
    };

    useEffect(() => {
        setExpanded(false);
    }, [visible]);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (condition?.code?.coding) {
        return (
            <>
                <div
                    className={`${style.biCondition} ${expanded ? style.active : ""} ${
                        visible ? "" : style.invisible
                    }`}>
                    <Normaltekst>{condition.code.coding[0].code}</Normaltekst>
                    <Element className={style.name}>{condition.code.text}</Element>
                    <div className={style.expand} onClick={() => toggleCondition()}>
                        {expanded ? <Expand /> : <Collapse />}
                    </div>
                </div>
                <Timeline entries={entries} isActive={expanded} mainRef={mainRef} biRef={biRef} />
            </>
        );
    }

    return null;
};
