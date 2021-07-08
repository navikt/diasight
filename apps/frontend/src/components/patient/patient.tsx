import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { usePatient } from "./hooks/use-patient";
import style from "./patient.module.less";

interface IProps {
    id: number;
}

export const Patient: FC<IProps> = ({ id }) => {

    const { patient, isLoading, isError } = usePatient(id);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    return (

        <div className={style.patientCard}>
            <Sidetittel>Kari Hansen</Sidetittel>
            <Undertittel>123456 78901</Undertittel>
            <Normaltekst>Kvinne</Normaltekst>
            <Normaltekst>Ugift</Normaltekst>
            <Normaltekst>Fulltidsansatt</Normaltekst>
            <Normaltekst>Adresse 1, 1234 Sted</Normaltekst>
            <div className={style.contact}>
                <Normaltekst>245 67 584</Normaltekst>
                <Normaltekst>epost@taket.no</Normaltekst>
            </div>
        </div>

    );
}