import { IAddress, IContactPoint } from "@ahryman40k/ts-fhir-types/lib/R4";
import { EmailFilled, HomeFilled, TelephoneFilled } from "@navikt/ds-icons/cjs";
import { Normaltekst } from "nav-frontend-typografi";
import React, { FC } from "react";
import { patientHomeAdressToString, patientEmailToString, patientPhoneToString } from "./utils";
import style from "./patient.module.less";

interface IProps {
    address: IAddress[];
    telecom: IContactPoint[];
}

export const PatientContact: FC<IProps> = ({ address, telecom }) => {
    return (
        <div className={style.contact}>
            <HomeFilled />
            <Normaltekst>{patientHomeAdressToString(address)}</Normaltekst>
            <TelephoneFilled />
            <Normaltekst>{patientPhoneToString(telecom)}</Normaltekst>
            <EmailFilled />
            <Normaltekst>{patientEmailToString(telecom)}</Normaltekst>
        </div>
    );
};
