/* eslint-disable react-hooks/exhaustive-deps */
import { IObservation, IReference, ObservationStatusKind } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Element, Undertekst } from "nav-frontend-typografi";
import React, { FC, useContext, useEffect, useState } from "react";
import { SelectionContext } from "../../layouts/contexts/selection-context";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import style from "./observation.module.less";

export const Observation: FC = () => {
    const { selections } = useContext(SelectionContext);
    const { addChange, removeChange, updateChange } = useContext(SummaryContext);
    const [observations, setObservations] = useState<IObservation[]>([]);

    const handleChange = (text: string, observation: IObservation) => {
        const updatedObservations = [...observations];
        const index = observations.indexOf(observation);
        updatedObservations[index].note = [{ text }];

        const ref = updatedObservations[index].focus?.find((r) => r);
        if (ref) {
            const status: ObservationStatusKind =
                updatedObservations[index].status || ObservationStatusKind._unknown;
            if (status === ObservationStatusKind._registered) {
                updateChange({
                    resource: updatedObservations[index],
                    ref,
                });
            } else if (status === ObservationStatusKind._unknown) {
                updatedObservations[index].status = ObservationStatusKind._registered;
                addChange({ resource: updatedObservations[index], ref });
            }
        }
        setObservations(updatedObservations);
    };

    const observationIsEdited = (observation: IObservation) => {
        const input = observation.note?.find((n) => n)?.text || "";
        return input.length > 0;
    };

    useEffect(() => {
        const obs = [...observations];
        const refs: IReference[] = selections.map((s) => s.condition);
        const filteredRefs = refs.filter((item, index) => refs.indexOf(item) === index);

        if (filteredRefs) {
            // Remains if in both obs and comp or does not exist in comp but has content
            const filteredObs = obs.filter((o) => {
                const focus = o.focus?.find((f) => f) || { reference: "error" };
                const edited = observationIsEdited(o);
                const result: boolean =
                    (!filteredRefs.includes(focus) && edited) || filteredRefs.includes(focus);

                if (!result && focus) removeChange({ resource: o, ref: focus });
                return result;
            });

            // Add new observation for each reference if it does not already exist
            const newObs: IObservation[] = [];

            for (const ref of filteredRefs) {
                if (ref) {
                    const alreadyExists = filteredObs.find((o) => o.focus?.includes(ref));

                    if (!alreadyExists) {
                        const observation: IObservation = {
                            resourceType: "Observation",
                            code: { text: ref?.display },
                            focus: [ref],
                            note: [{ text: "" }],
                            issued: new Date().toISOString(),
                        };
                        newObs.push(observation);
                    }
                }
            }

            setObservations([...filteredObs, ...newObs]);
        }
    }, [selections]);

    return (
        <div className={style.observationWrapper}>
            <Element>Notat</Element>
            <div className={style.inputArea}>
                {observations.map((o, i) => {
                    return (
                        <>
                            <Undertekst key={"t" + i} className={style.inputHeader}>
                                {o.focus?.find((f) => f.display)?.display}
                            </Undertekst>
                            {
                                <textarea
                                    key={i}
                                    placeholder="Skriv notat her..."
                                    className={style.inputField}
                                    value={o.note?.find((n) => n !== undefined)?.text}
                                    onChange={(e) => {
                                        handleChange(e.target.value, o);
                                    }}
                                />
                            }
                        </>
                    );
                })}
            </div>
        </div>
    );
};
