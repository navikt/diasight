import { IAppointment } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Innholdstittel, Undertekst, Undertittel, Normaltekst } from "nav-frontend-typografi";
import Lenke from 'nav-frontend-lenker';
import React, { FC } from "react";
import { dateToStrings } from "../../utils";
import style from "./patient.module.less";
import { EyeFilled } from "@navikt/ds-icons";

interface IProps {
    appointment: IAppointment;
}

export const Appointment: FC<IProps> = ({ appointment }) => {


    const { day, month, year } = appointment.start ? dateToStrings(new Date(appointment.start)) : dateToStrings(new Date());

    if (!appointment.serviceType) return <div>error</div>;

    return (
        <div className={style.appointmentWrapper}>
            <div>
                <Innholdstittel>{day}</Innholdstittel>
                <Undertekst>{month + " " + year}</Undertekst>
            </div>
            <EyeFilled />
            <Undertittel>{appointment.serviceType[0].text}</Undertittel>
            <Lenke href="#"><Normaltekst>Se detaljer</Normaltekst></Lenke>
        </div>
    );
}