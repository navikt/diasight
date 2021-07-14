import { Knapp } from "nav-frontend-knapper";
import React, { FC } from "react"
import { Composition } from "../components/composition";
import Patient from "../components/patient";
import style from "./patient-detail-layout.module.less";

interface IProps {
    id: number
}

export const PatientDetailLayout: FC<IProps> = ({ id }) => {
    return (<div className={style.patientDetailWrapper}>
        <Patient id={id} />
        <div className={style.buttons}>
            <Knapp>Resept</Knapp>
            <Knapp>Henvisning</Knapp>
            <Knapp>Sykmelding</Knapp>
            <Knapp>Legeerklæring</Knapp>
        </div>
        <div></div>
        <div className={style.composition}>
            <Composition patientID={id} />
        </div>
    </div>)
}