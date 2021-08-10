import React, { FC } from "react"
import { Element, Undertekst } from "nav-frontend-typografi"
import style from "./schedule-list.module.less"
import { Link } from "wouter"

export const ScheduleList: FC = () => {
    // For now, all of the appointments are hardcoded
    // The developers and designers should communicate here
    // Find out how many pixels each appointment should be
    // And calculate where the current time marker should be 

    return (
        <div className={style.wrapper}>
            <Element>Fredag 11. juli 2021</Element>
            <div className={style.currentTimeWrapper}>
                <Undertekst className={style.currentTimeClock}>12:18</Undertekst>
                <div className={style.currentTimeMarker} />
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>11:30</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Sofie Fagermo</Element>
                    <Undertekst className={style.patientAge}>22 år</Undertekst>
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>11:45</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Daniel Salvesen</Element>
                    <Undertekst className={style.patientAge}>48 år</Undertekst>
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>12:00</Undertekst>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>12:15</Undertekst>
                <div className={style.patient}>
                    <Link href={"/pasient/1"}>
                        <Element className={style.patientName}>
                            <span style={{ cursor: "pointer" }}>Ola Normann</span>
                        </Element>
                    </Link>
                    <Undertekst className={style.patientAge}>72 år</Undertekst>
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>12:30</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Maja Ingebretsen</Element>
                    <Undertekst className={style.patientAge}>32 år</Undertekst>
                </div>
            </div>
        </div>
    )
}