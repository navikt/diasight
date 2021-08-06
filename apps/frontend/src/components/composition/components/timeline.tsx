import React, { FC, useContext, useState } from "react";
import style from "../composition.module.less";
import {
    IComposition,
    ICondition,
    IObservation,
    IReference,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { TimelineEntry } from "./timeline-entry";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { SummaryContext } from "../../../layouts/contexts/summary-context";
import { TimelineAddition } from "./timeline-addition";
import { AddCircle } from "@navikt/ds-icons/cjs";

interface IProps {
    entries: IReference[] | undefined;
    isActive: boolean;
    composition: IComposition;
    condition: ICondition;
}

export const Timeline: FC<IProps> = ({ entries, composition, condition, isActive = true }) => {
    const { getResourcesFromChange } = useContext(SummaryContext);

    const additions = getResourcesFromChange(condition, composition);

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
                    <tr className={style.addEntry}>
                        <th></th>
                        <th>
                            <AddCircle />
                        </th>
                        <th>
                            <Normaltekst>Legg til ny</Normaltekst>
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                    {additions
                        ? additions.map((resource, index) => {
                              return resource ? (
                                  <TimelineAddition
                                      key={index}
                                      resource={resource as IObservation}
                                      condition={condition}
                                      composition={composition}
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
                                      composition={composition}
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
