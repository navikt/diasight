import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import style from "./patient.module.less";
import { usePatient, usePatientName, usePatientSID } from "./hooks";
import { genderToNorwegian, maritalStatusToNorwegian, patientHomeAdressToString, patientEmailToString, patientPhoneToString } from "./utils";

interface IProps {
    id: number;
}

export const Patient: FC<IProps> = ({ id }) => {

    // Current use of custom hooks might be redundant and bad for performance. 
    // Consider altering usePatientName() and usePatientSID() to util functions to prevent unnecessary re-renders.
    // Alternatively/additionally make a simplified patient state to add all data before render.  
    const { patient, isLoading, isError } = usePatient(id);
    const patientName = usePatientName(patient);
    const patientSID = usePatientSID(patient);

    console.log(patient);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    return (

        <div className={style.patientCard}>
            <Sidetittel>{patientName}</Sidetittel>
            <Undertittel>{patientSID}</Undertittel>
            <Normaltekst>{genderToNorwegian(patient.gender)}</Normaltekst>
            <Normaltekst>{maritalStatusToNorwegian(patient.maritalStatus)}</Normaltekst>
            <Normaltekst>Fulltidsansatt</Normaltekst>
            <Normaltekst>{patientHomeAdressToString(patient.address)}</Normaltekst>
            <div className={style.contact}>
                <Normaltekst>{patientPhoneToString(patient.telecom)}</Normaltekst>
                <Normaltekst>{patientEmailToString(patient.telecom)}</Normaltekst>
            </div>
        </div>

    );
}