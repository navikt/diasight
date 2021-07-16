import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import style from "./patient.module.less";
import { usePatient, usePatientName, usePatientSID } from "./hooks";
import { genderToNorwegian, maritalStatusToNorwegian, patientHomeAdressToString, patientEmailToString, patientPhoneToString } from "./utils";
import { IAppointment, ICondition, IMedication } from "@ahryman40k/ts-fhir-types/lib/R4";
import { ChronicCondition } from "./chronic-condition";
import { ActiveMedication } from "./active-medication";
import { Email, Home, Telephone } from "@navikt/ds-icons/cjs";
import { AppointmentStatusKind } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Appointment } from "./appointment";

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

    const apps: IAppointment[] = [{
        resourceType: "Appointment",
        status: AppointmentStatusKind._booked,
        serviceType: [{
            text: "Fysioterapi",
            coding: [{ code: "65" }]
        }],
        start: "2021-08-15T14:30:00.000+01:00",
        participant: [
            {
                actor: { reference: "Patient/1" }
            },
            {
                actor: { reference: "Practitioner/2" }
            }
        ]
    }];

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    return (

        <div className={style.patientCard}>
            <Sidetittel>{patientName}</Sidetittel>
            <div className={style.column}>
                <Undertittel>{patientSID}</Undertittel>
                <ChronicCondition conditions={cons} />
                <ActiveMedication medications={meds} />
            </div>
            <div className={style.column}>
                <div className={style.infoGroup}>
                    <Normaltekst>{genderToNorwegian(patient.gender)}</Normaltekst>
                    <div></div>
                    <Normaltekst>{maritalStatusToNorwegian(patient.maritalStatus)}</Normaltekst>
                    <div></div>
                    <Normaltekst>Fulltidsansatt</Normaltekst>
                </div>
                <div className={style.contact}>
                    <Home />
                    <Normaltekst>{patientHomeAdressToString(patient.address)}</Normaltekst>
                    <Telephone />
                    <Normaltekst>{patientPhoneToString(patient.telecom)}</Normaltekst>
                    <Email />
                    <Normaltekst>{patientEmailToString(patient.telecom)}</Normaltekst>
                </div>
                <Appointment appointment={apps[0]} />
            </div>
        </div>

    );
}