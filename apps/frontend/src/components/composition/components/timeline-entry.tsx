import React, { FC, useContext, useEffect, useState } from "react";
import { usePatientEntry } from "../hooks/use-patient-entry";
import style from "../composition.module.less";
import { Normaltekst } from "nav-frontend-typografi";
import { bundleToEntry } from "../utils/resource-to-entry";
import { CompositionContext } from "../../../layouts/contexts/composition-context";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";

interface IProps {
    reference: IReference;
    condition: IReference;
    visible: boolean;
}

export const TimelineEntry: FC<IProps> = ({ reference, condition, visible }) => {
    const { entry, isLoading, isError } = usePatientEntry(reference);
    const { toggleEntry } = useContext(CompositionContext);
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        setSelected(false);
    }, [visible]);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (entry) {
        const resource = bundleToEntry(entry);

        return (
            <tr>
                <td>
                    <Normaltekst>{resource.date}</Normaltekst>
                </td>
                <td>
                    <div
                        className={`${style.timestamp} ${selected ? style.selected : ""}`}
                        onClick={() => {
                            toggleEntry(reference, condition);
                            setSelected(!selected);
                        }}></div>
                </td>
                <td>
                    <Normaltekst>{resource.text}</Normaltekst>
                </td>
                <td>
                    <Normaltekst>{resource.type}</Normaltekst>
                </td>
                <td>
                    <Normaltekst>{resource.author}</Normaltekst>
                </td>
            </tr>
        );
    }

    return null;
};
