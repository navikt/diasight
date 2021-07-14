import React, { FC } from "react";
import { usePatientEntry } from "./hooks/use-patient-entry";
import style from "./composition.module.less";
import { Normaltekst } from "nav-frontend-typografi";
import { extractDataFromEntry } from "./utils/entryToResource";

interface IProps {
    reference: string;
}

export const TimelineEntry: FC<IProps> = ({ reference }) => {

    const { entry, isLoading, isError } = usePatientEntry(reference);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (entry) {
        console.log(entry);
        const resource = extractDataFromEntry(entry);

        return (
            <tr>
                <td><Normaltekst>{resource.date}</Normaltekst></td>
                <td>
                    <div className={style.timestamp}></div>
                </td>
                <td><Normaltekst>{resource.text}</Normaltekst></td>
                <td><Normaltekst>{resource.type}</Normaltekst></td>
                <td><Normaltekst>{resource.department}</Normaltekst></td>
            </tr>
        );
    }

    return null;
}