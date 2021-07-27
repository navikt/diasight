import React, { FC, useContext, useEffect, useState } from "react";
import style from "../composition.module.less";
import { v4 } from "uuid";
import { Normaltekst } from "nav-frontend-typografi";
import { bundleToEntry } from "../utils/resource-to-entry";
import { CompositionContext } from "../../../layouts/contexts/composition-context";
import { HumanNameUseKind, IObservation, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";

interface IProps {
    resource: IObservation;
    condition: IReference;
    visible: boolean;
}

export const TimelineAddition: FC<IProps> = ({ resource, condition, visible }) => {
    const { toggleEntry } = useContext(CompositionContext);
    const [selected, setSelected] = useState<boolean>(false);

    const generatedReference: IReference = {
        reference: "Temp/" + resource.resourceType + "/" + v4(),
    };

    useEffect(() => {
        setSelected(false);
    }, [visible]);

    if (resource) {
        const entry = bundleToEntry([
            resource,
            {
                resourceType: "Practitioner",
                name: [
                    {
                        use: HumanNameUseKind._usual,
                        family: "Klut",
                        given: ["Knut"],
                    },
                ],
            },
        ]);

        return (
            <tr>
                <td>
                    <Normaltekst>{entry.date}</Normaltekst>
                </td>
                <td>
                    <div
                        className={`${style.timestamp} ${selected ? style.selected : ""}`}
                        onClick={() => {
                            toggleEntry(generatedReference, condition);
                            setSelected(!selected);
                        }}></div>
                </td>
                <td>
                    <Normaltekst>{entry.text}</Normaltekst>
                </td>
                <td>
                    <Normaltekst>{entry.type}</Normaltekst>
                </td>
                <td>
                    <Normaltekst>{entry.author}</Normaltekst>
                </td>
            </tr>
        );
    }

    return null;
};