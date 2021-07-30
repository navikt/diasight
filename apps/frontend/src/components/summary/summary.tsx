import { Element, Sidetittel } from "nav-frontend-typografi";
import React, { FC, useContext } from "react";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import { SummaryEntry, SummarySubmitButton } from "./components/";
import style from "./summary.module.less";

export const Summary: FC = () => {
    const { getUniqueConditions, getResourcesByCondition } = useContext(SummaryContext);

    // TODO: Handle observation when returning to composition view

    return (
        <div className={style.summaryWrapper}>
            <Element>Oppsummering</Element>
            <Sidetittel>
                I dagens konsultasjon har du opprettet <span>1 notat</span> og skrevet{" "}
                <span>1 sykemelding</span>.
            </Sidetittel>
            {getUniqueConditions().map((ref) => {
                const resources = getResourcesByCondition(ref);
                return <SummaryEntry resources={resources} reference={ref} />;
            })}
            <SummarySubmitButton />
        </div>
    );
};
