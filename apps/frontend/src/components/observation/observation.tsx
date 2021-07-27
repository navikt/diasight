import {
    IAnnotation,
    IComposition,
    IObservation,
    IReference,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { of } from "fp-ts/lib/Either";
import { Element, Undertekst } from "nav-frontend-typografi";
import React, { FC, useContext, useEffect, useState } from "react";
import { CompositionContext } from "../../layouts/contexts/composition-context";
import style from "./observation.module.less";

export const Observation: FC = () => {
    const { composition } = useContext(CompositionContext);
    const [observations, setObservations] = useState<IObservation[]>([]);

    useEffect(() => {
        const obs = [...observations];
        const refs = composition.section?.map((s) => s.focus);

        if (refs) {
            // Exists in both obs and comp or does not exist in comp but has content
            const filteredObs = obs.filter((o) => {
                const focus = o.focus?.find((f) => f);
                const input = o.note?.find((n) => n)?.text || "";
                return (!refs.includes(focus) && input.length) || refs.includes(focus);
            });

            // Add new observation for each reference if it does not already exist
            const newObs: IObservation[] = [];

            for (const ref of refs) {
                if (ref) {
                    const alreadyExists = filteredObs.find((o) => o.focus?.includes(ref));

                    if (!alreadyExists) {
                        newObs.push({
                            resourceType: "Observation",
                            code: { text: ref?.display },
                            focus: [ref],
                            note: [{ text: "" }],
                        });
                    }
                }
            }

            setObservations([...filteredObs, ...newObs]);
        }
    }, [composition.section]);

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
                                        const obs = [...observations];
                                        observations[i].note = [
                                            { text: e.target.value },
                                        ] as IAnnotation[];
                                        setObservations(obs);
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
