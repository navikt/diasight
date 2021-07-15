import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import style from "./patient.module.less";
import { usePatient, usePatientName, usePatientSID } from "./hooks";
import { genderToNorwegian, maritalStatusToNorwegian, patientHomeAdressToString, patientEmailToString, patientPhoneToString } from "./utils";
import { ICondition, IMedication } from "@ahryman40k/ts-fhir-types/lib/R4";
import { ChronicCondition } from "./chronic-condition";
import { ActiveMedication } from "./active-medication";

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

    const cons: ICondition[] = [{
        resourceType: "Condition",
        subject: { reference: "Patient/1" },
        code: { text: "Magesyre" }
    }];

    const meds: IMedication[] = [{
        resourceType: "Medication",
        code: { text: "Antepsin" }
    }];

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    return (

        <div className={style.patientCard}>
            <Sidetittel>{patientName}</Sidetittel>
            <div className={style.infoGroup}>
                <Undertittel>{patientSID}</Undertittel>
                <div>
                    <Normaltekst>{genderToNorwegian(patient.gender)}</Normaltekst>
                    <div></div>
                    <Normaltekst>{maritalStatusToNorwegian(patient.maritalStatus)}</Normaltekst>
                    <div></div>
                    <Normaltekst>Fulltidsansatt</Normaltekst>
                </div>
            </div>
            <div className={style.column}>
                <ChronicCondition conditions={cons} />
                <ActiveMedication medications={meds} />

            </div>
            <div className={style.column}>
                <div className={style.contact}>
                    <Normaltekst>{patientHomeAdressToString(patient.address)}</Normaltekst>
                    <Normaltekst>{patientPhoneToString(patient.telecom)}</Normaltekst>
                    <Normaltekst>{patientEmailToString(patient.telecom)}</Normaltekst>
                </div>
            </div>
        </div>

    );
}