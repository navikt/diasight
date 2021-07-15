import { Knapp } from "nav-frontend-knapper";
import React, { FC } from "react"
import { Composition } from "../components/composition";
import Patient from "../components/patient";
import style from "./patient-detail-layout.module.less";

interface IProps {
    id: number
}

export const PatientDetailLayout: FC<IProps> = ({ id }) => {
    return (
        <div className={style.patientDetailWrapper}>
            <div className={style.column}>
                <Patient id={id} />
            </div>
            <div className={style.column}>
                <div className={style.buttons}>
                    <Knapp>Resept</Knapp>
                    <Knapp>Henvisning</Knapp>
                    <Knapp>Sykmelding</Knapp>
                    <Knapp>Legeerklæring</Knapp>
                </div>

                <div className={style.composition}>
                    <Composition patientID={id} />
                </div>
            </div>
        </div>
    );
}