import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import style from "./patient.module.less";
import { genderToNorwegian, maritalStatusToNorwegian } from "./utils";
import { HumanNameUseKind, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { filterHumanNameOnUse, humanNameToString } from "../../utils";
import { patientSIDToString } from "./utils/patient-sid";

interface IProps {
    patient: IPatient;
}

export const Patient: FC<IProps> = ({ patient }) => {
    // Current use of custom hooks might be redundant and bad for performance.
    // Consider altering usePatientName() and usePatientSID() to util functions to prevent unnecessary re-renders.
    // Alternatively/additionally make a simplified patient state to add all data before render.

    if (patient) {
        const name = patient.name
            ? filterHumanNameOnUse(patient.name, HumanNameUseKind._official)
            : undefined;
        const SID = patientSIDToString(patient);
        const gender = genderToNorwegian(patient.gender || "ukjent");
        const maritalStatus = patient.maritalStatus
            ? maritalStatusToNorwegian(patient.maritalStatus)
            : "Ukjent";

        return (
            <div className={style.patientCard}>
                <Sidetittel>{name ? humanNameToString(name) : "Ukjent"}</Sidetittel>
                <Undertittel className={style.sid}>{SID}</Undertittel>
                <div className={style.infoGroup}>
                    <Normaltekst>{gender}</Normaltekst>
                    <div></div>
                    <Normaltekst>{maritalStatus}</Normaltekst>
                    <div></div>
                    <Normaltekst>Fulltidsansatt</Normaltekst>
                </div>
            </div>
        );
    }

    return <div>Pasient finnes ikke</div>;
};
