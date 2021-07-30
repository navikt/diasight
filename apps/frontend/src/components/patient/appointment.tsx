import { AppointmentStatusKind, IAppointment } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Innholdstittel, Undertekst, Undertittel, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import React, { FC } from "react";
import { dateToStrings } from "../../utils";
import style from "./patient.module.less";
import { EyeFilled } from "@navikt/ds-icons/cjs";

interface IProps {
    appointment: IAppointment;
}

const apps: IAppointment[] = [
    {
        resourceType: "Appointment",
        status: AppointmentStatusKind._booked,
        serviceType: [
            {
                text: "Fysioterapi",
                coding: [{ code: "65" }],
            },
        ],
        start: "2021-08-15T14:30:00.000+01:00",
        participant: [
            {
                actor: { reference: "Patient/1" },
            },
            {
                actor: { reference: "Practitioner/2" },
            },
        ],
    },
];

export const Appointment: FC<IProps> = ({ appointment = apps[0] }) => {
    const { day, month, year } = appointment.start
        ? dateToStrings(new Date(appointment.start))
        : dateToStrings(new Date());

    if (!appointment.serviceType) return <div>error</div>;

    return (
        <div className={style.appointmentWrapper}>
            <div>
                <Innholdstittel>{day}</Innholdstittel>
                <Undertekst>{month + " " + year}</Undertekst>
            </div>
            <EyeFilled />
            <Undertittel>{appointment.serviceType[0].text}</Undertittel>
            <Lenke href="#">
                <Normaltekst>Se detaljer</Normaltekst>
            </Lenke>
        </div>
    );
};
