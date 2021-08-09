import {
    ICondition,
    IObservation,
    IReference,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { Element, Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "../summary.module.less";
import { resourceToSummaryEntry } from "../utils/resource-to-summary-entry";

interface IProps {
    resources: IResourceList[];
}

// TODO: create resourceToSummaryEntry functions for unpackaging resources.

export const SummaryEntry: FC<IProps> = ({ resources }) => {
    return (
        <div className={style.summaryEntryWrapper}>
            <div className={style.resourceList}>
                {resources.map((resource, i) => {
                    const entry = resourceToSummaryEntry(resource);
                    return (
                        <div className={style.summaryEntry} key={i}>
                            <Undertittel key={i}>{entry.title}</Undertittel>
                            <div key={"div" + i} className={style.summaryDescription}>
                                {entry.subject !== "" ? (
                                    <Element key={i}>{entry.subject}</Element>
                                ) : null}
                                {entry.descriptors.map((d, j) => {
                                    return <Normaltekst key={j}>{d}</Normaltekst>;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
