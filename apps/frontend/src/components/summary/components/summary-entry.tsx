import {
    ICondition,
    IObservation,
    IReference,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "../summary.module.less";

interface IProps {
    resources: IResourceList[];
    condition: ICondition;
}

// TODO: create resourceToSummaryEntry functions for unpackaging resources.

export const SummaryEntry: FC<IProps> = ({ resources, condition }) => {
    const observation: IObservation = resources.find(
        (r) => r.resourceType === "Observation"
    ) as IObservation;

    const note: string = observation.note?.find((n) => n)?.text || "";

    return (
        <div className={style.summaryEntryWrapper}>
            <Systemtittel>{condition.code?.text}</Systemtittel>
            <Normaltekst>{note}</Normaltekst>
        </div>
    );
};
