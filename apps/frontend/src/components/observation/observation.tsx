/* eslint-disable react-hooks/exhaustive-deps */
import {
    IComposition,
    ICondition,
    IObservation,
    ObservationStatusKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { Element, Undertekst } from "nav-frontend-typografi";
import React, { FC, useContext, useEffect, useState } from "react";
import { Delete } from "@navikt/ds-icons/cjs";
import { v4 } from "uuid";
import { SelectionContext } from "../../layouts/contexts/selection-context";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import style from "./observation.module.less";
import { Textarea } from "nav-frontend-skjema";

export const Observation: FC = () => {
    const { selections } = useContext(SelectionContext);
    const { changes, addResource, removeResource, updateResource, findResourceByType } =
        useContext(SummaryContext);
    const [observations, setObservations] = useState<IObservation[]>([]);

    const handleChange = (
        text: string,
        observation: IObservation,
        condition: ICondition,
        composition: IComposition
    ) => {
        observation.note = [{ text }];
        updateResource(composition, condition, observation);
    };

    const observationIsEdited = (observation: IObservation) => {
        const input = observation.note?.find((n) => n)?.text || "";
        return input.length > 0;
    };

    useEffect(() => {
        if (selections) {
            // All observations that are either in both observations and selections, or does not exist in selections but has content remains.
            const obs = observations.filter((o) => {
                const existsInSelections = selections.find((s) => s.resources.includes(o));
                const isEdited = observationIsEdited(o);
                const result: boolean =
                    (!existsInSelections && isEdited) || existsInSelections !== undefined;
                if (!result && existsInSelections)
                    removeResource(existsInSelections.composition, existsInSelections.condition, o);

                return result;
            });

            for (const selection of selections) {
                const alreadyExists = findResourceByType(
                    selection.composition,
                    selection.condition,
                    "Observation"
                ) as IObservation;

                if (!alreadyExists) {
                    const observation: IObservation = {
                        resourceType: "Observation",
                        id: v4(),
                        status: ObservationStatusKind._unknown,
                        code: { text: "Notat" },
                        focus: [
                            {
                                reference: "Observation/" + selection.condition.id,
                                id: selection.condition.id,
                            },
                        ],
                        note: [{ text: "" }],
                        issued: new Date().toISOString(),
                    };
                    obs.push(observation);
                    addResource(selection.composition, selection.condition, observation);
                }
            }

            setObservations(obs);
        }
    }, [selections]);

    return (
        <div className={style.observationWrapper}>
            <Element>Notat</Element>
            <div className={style.inputArea}>
                {changes.map((c, i) => {
                    const observation = findResourceByType(
                        c.composition,
                        c.condition,
                        "Observation"
                    ) as IObservation;

                    if (observation) {
                        return (
                            <>
                                <Undertekst key={"t" + i} className={style.inputHeader}>
                                    {c.condition.code?.text + " "}
                                </Undertekst>
                                <Delete
                                    className={style.delete}
                                    onClick={() =>
                                        removeResource(c.composition, c.condition, observation)
                                    }
                                />
                                {
                                    <div className={style.inputField}>
                                        <Textarea
                                            key={i}
                                            placeholder="Skriv notat her..."
                                            maxLength={0}
                                            value={observation.note?.find((f) => f)?.text || ""}
                                            onChange={(e) => {
                                                handleChange(
                                                    e.target.value,
                                                    observation,
                                                    c.condition,
                                                    c.composition
                                                );
                                            }}
                                        />
                                    </div>
                                }
                            </>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};
