import React, { FC, useContext, useState } from "react";
import { usePatientEntry } from "./hooks/use-patient-entry";
import style from "./composition.module.less";
import { Normaltekst } from "nav-frontend-typografi";
import { bundleToEntry } from "./utils/resourceToEntry";
import { CompositionContext } from "../../layouts/contexts/composition-context";
import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";

interface IProps {
    reference: IReference;
}

export const TimelineEntry: FC<IProps> = ({ reference }) => {

    const { entry, isLoading, isError } = usePatientEntry(reference);
    const { references, toggleReference } = useContext(CompositionContext);
    const [ selected, setSelected ] = useState<boolean>(false);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (entry) {
        const resource = bundleToEntry(entry);

        return (
            <tr>
                <td><Normaltekst>{resource.date}</Normaltekst></td>
                <td>
                    <div className={`${style.timestamp} ${selected ? style.selected : ""}`} onClick={() => {
                        toggleReference(reference);
                        setSelected(!selected);}}>
                    </div>
                </td>
                <td><Normaltekst>{resource.text}</Normaltekst></td>
                <td><Normaltekst>{resource.type}</Normaltekst></td>
                <td><Normaltekst>{resource.author}</Normaltekst></td>
            </tr>
        );
    }

    return null;
}