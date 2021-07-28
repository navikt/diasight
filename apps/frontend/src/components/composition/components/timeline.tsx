import React, { FC, useContext, useState } from "react";
import style from "../composition.module.less";
import { IObservation, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { TimelineEntry } from "./timeline-entry";
import { Normaltekst, Element, Undertittel } from "nav-frontend-typografi";
import { SummaryContext } from "../../../layouts/contexts/summary-context";
import { TimelineAddition } from "./timeline-addition";

interface IProps {
    entries: IReference[];
    isActive: boolean;
    condition: IReference;
}

export const Timeline: FC<IProps> = ({ entries, condition, isActive = true }) => {
    const { getResourcesByCondition } = useContext(SummaryContext);

    const additions = getResourcesByCondition(condition);

    if (!(entries || additions.length)) return null;

    return (
        <div className={`${style.timelineWrapper} ${isActive ? "" : style.invisible} `}>
            <table className={style.tableWrapper}>
                <thead>
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
                </thead>
                <tbody>
                    {additions
                        ? additions.map((resource, index) => {
                              return resource ? (
                                  <TimelineAddition
                                      key={index}
                                      resource={resource as IObservation}
                                      condition={condition}
                                      visible={isActive}
                                  />
                              ) : null;
                          })
                        : null}
                    {entries
                        ? entries.map((ref, index) => {
                              return ref ? (
                                  <TimelineEntry
                                      key={index}
                                      reference={ref}
                                      condition={condition}
                                      visible={isActive}
                                  />
                              ) : null;
                          })
                        : null}
                </tbody>
            </table>
        </div>
    );
};
