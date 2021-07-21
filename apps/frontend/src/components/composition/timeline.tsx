import React, { FC, useState } from "react";
import style from "./composition.module.less";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { TimelineEntry } from "./timeline-entry";
import { Normaltekst, Element, Undertittel } from "nav-frontend-typografi";

interface IProps {
    entries: IReference[] | undefined;
    isActive: boolean;
    mainRef: IReference;
    biRef?: IReference;
}

export const Timeline: FC<IProps> = ({ entries, mainRef, biRef = null, isActive = true }) => {
    if (entries === undefined) return null;

    return (
        <div className={`${style.timelineWrapper} ${isActive ? "" : style.invisible} `}>
            <table className={style.tableWrapper}>
                <tr>
                    <th>
                        <Element>Dato</Element>
                    </th>
                    <td></td>
                    <th>
                        <Element>Hendelsesforløp</Element>
                    </th>
                    <th>
                        <Element>Type</Element>
                    </th>
                    <th>
                        <Element>Avdeling</Element>
                    </th>
                </tr>
                {entries.map((ref, index) => {
                    return ref.reference ? (
                        <TimelineEntry
                            key={index}
                            reference={ref}
                            mainRef={mainRef}
                            biRef={biRef}
                            visible={isActive}
                        />
                    ) : null;
                })}
            </table>
        </div>
    );
};
