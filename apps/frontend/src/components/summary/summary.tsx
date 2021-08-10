import { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Element, Sidetittel } from "nav-frontend-typografi";
import React, { FC, useContext } from "react";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import { SummaryEntry, SummarySubmitButton } from "./components/";
import style from "./summary.module.less";

export const Summary: FC = () => {
    const { changes } = useContext(SummaryContext);

    const uniqueResources: IResourceList[] = [];
    changes.map((c) => {
        c.resources.map((r) => {
            if (!uniqueResources.includes(r)) uniqueResources.push(r);
        });
    });

    console.log(changes)

    return (
        <div className={style.summaryWrapper}>
            <Element>Oppsummering</Element>
            <Sidetittel>
                I dagens konsultasjon har du opprettet <span>1 notat</span> og skrevet{" "}
                <span>1 sykemelding</span>.
            </Sidetittel>
            {changes.map((c, index) => {
                return <SummaryEntry key={index} resources={c.resources} />;
            })}
            <SummarySubmitButton />
        </div>
    );
};
