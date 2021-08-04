import React, { FC, useContext, useEffect, useState } from "react";
import { usePatientEntry } from "../hooks/use-patient-entry";
import style from "../composition.module.less";
import { Normaltekst } from "nav-frontend-typografi";
import { bundleToEntry } from "../utils/resource-to-entry";
import { IComposition, ICondition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { SelectionContext } from "../../../layouts/contexts/selection-context";

interface IProps {
    reference: IReference;
    condition: ICondition;
    composition: IComposition;
    visible: boolean;
}

export const TimelineEntry: FC<IProps> = ({ reference, condition, composition, visible }) => {
    const { entry, isLoading, isError } = usePatientEntry(reference);
    const { toggleEntry } = useContext(SelectionContext);
    const [selected, setSelected] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

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
                            toggleEntry(entry[0], condition, composition);
                            setSelected(!selected);
                        }}></div>
                </td>
                <td className={style.resourceLink}
                    onClick={() => {
                        setExpanded(!expanded)
                        console.log(expanded)
                    }}>
                    <Normaltekst>{resource.text}</Normaltekst>
                    {expanded ? <h3>Expanded</h3> : <h3>Unexpanded</h3>}
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
