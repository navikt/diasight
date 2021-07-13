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
        <Composition patientID={id} />
    </div>)
}