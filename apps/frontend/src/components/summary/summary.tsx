import { Element, Sidetittel } from "nav-frontend-typografi";
import React, { FC, useContext } from "react";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import { SummaryEntry, SummarySubmitButton } from "./components/";
import style from "./summary.module.less";

export const Summary: FC = () => {
    const { changes } = useContext(SummaryContext);

    // TODO: Handle observation when returning to composition view

    return (
        <div className={style.summaryWrapper}>
            <Element>Oppsummering</Element>
            <Sidetittel>
                I dagens konsultasjon har du opprettet <span>1 notat</span> og skrevet{" "}
                <span>1 sykemelding</span>.
            </Sidetittel>
            {changes.map((c, index) => {
                return <SummaryEntry key={index} resources={c.resources} condition={c.condition} />;
            })}
            <SummarySubmitButton />
        </div>
    );
};
