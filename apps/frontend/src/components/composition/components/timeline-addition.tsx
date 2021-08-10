import React, { FC, useContext, useEffect, useState } from "react";
import style from "../composition.module.less";
import { v4 } from "uuid";
import { Normaltekst, Undertekst } from "nav-frontend-typografi";
import { bundleToEntry } from "../utils/resource-to-entry";
import {
    HumanNameUseKind,
    IComposition,
    ICondition,
    IObservation,
    IReference,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { SelectionContext } from "../../../layouts/contexts/selection-context";
import { EditFilled } from "@navikt/ds-icons/cjs";

interface IProps {
    resource: IObservation;
    condition: ICondition;
    composition: IComposition;
    visible: boolean;
}

export const TimelineAddition: FC<IProps> = ({ resource, condition, composition, visible }) => {
    const { toggleEntry } = useContext(SelectionContext);
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
                    <Undertekst>{entry.date.slice(0, 10)}</Undertekst>
                </td>
                <td>
                    <div
                        className={`${style.timestamp} ${style.timestampAddition} ${
                            selected ? style.selected : ""
                        }`}
                        onClick={() => {
                            toggleEntry(resource, condition, composition);
                            setSelected(!selected);
                        }}>
                        <EditFilled />
                    </div>
                </td>
                <td>
                    <Normaltekst>{entry.text}</Normaltekst>
                </td>
                <td>
                    <Undertekst>{entry.type}</Undertekst>
                </td>
                <td>
                    <Undertekst>{entry.author}</Undertekst>
                </td>
            </tr>
        );
    }

    return null;
};
