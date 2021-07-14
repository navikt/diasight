import { IAppointment, IObservation } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { FC } from "react";
import { usePatientEntry } from "./hooks/use-patient-entry";
import style from "./composition.module.less";
import { Normaltekst, Element, Undertittel } from "nav-frontend-typografi";

interface IProps {
    reference: string;
}

export const TimelineEntry: FC<IProps> = ({ reference }) => {

    const { entry, isLoading, isError } = usePatientEntry(reference);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    return (
        <tr>
            <td><Normaltekst>{entry.issued}</Normaltekst></td>
            <td>
                <div className={style.timestamp}></div>
            </td>
            <td><Normaltekst>{entry.code.text}</Normaltekst></td>
            <td><Normaltekst>Notat</Normaltekst></td>
            <td><Normaltekst>Sykehuset Innlandet</Normaltekst></td>
        </tr>
    );
}