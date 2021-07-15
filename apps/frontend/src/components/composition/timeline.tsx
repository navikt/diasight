import React, { FC, useState } from "react";
import style from "./composition.module.less";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { TimelineEntry } from "./timeline-entry";
import { Normaltekst, Element, Undertittel } from "nav-frontend-typografi";


interface IProps {
    entries: IReference[] | undefined;
    isActive: boolean;
}

export const Timeline: FC<IProps> = ({ entries, isActive = true }) => {

    if (entries === undefined) return null;

    return (<div className={`${style.timelineWrapper} ${isActive ? style.visible : ""} `}>
        <table className={style.tableWrapper}>
            <tr>
                <th><Element>Dato</Element></th>
                <td></td>
                <th><Element>Hendelsesforløp</Element></th>
                <th><Element>Type</Element></th>
                <th><Element>Avdeling</Element></th>
            </tr>
            {entries.map((ref, index) => {
                return ref.reference ? <TimelineEntry key={index} reference={ref.reference} /> : null;
            })}
        </table>
    </div>);

}