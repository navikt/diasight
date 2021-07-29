import React, { FC } from "react"
import { Element, Undertekst } from "nav-frontend-typografi"
import style from "./schedule-list.module.less"

export const ScheduleList: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.appointment}>
                <Undertekst className={style.timeHour}>09:00</Undertekst>
                <Element className={style.patientName}>Sofie Fagermo</Element>
                <Undertekst className={style.patientAge}>22 år</Undertekst>
            </div>
            <div className={style.appointment}>
                <Undertekst className={style.timeHour}>10:00</Undertekst>
                <Element className={style.patientName}>Daniel Salvesen</Element>
                <Undertekst className={style.patientAge}>48 år</Undertekst>
            </div>
            <div className={style.appointment}>
                <Undertekst className={style.timeHour}>11:00</Undertekst>
                <Element className={style.patientName}>Maja Ingebretsen</Element>
                <Undertekst className={style.patientAge}>32 år</Undertekst>
            </div>
            <div className={style.appointment}>
                <Undertekst className={style.timeHour}>12:00</Undertekst>
            </div>
            <div className={style.appointment}>
                <Undertekst className={style.timeHour}>13:00</Undertekst>
                <Element className={style.patientName}>Kari Hansen</Element>
                <Undertekst className={style.patientAge}>47 år</Undertekst>
            </div>
        </div>
    )
}