import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./scheduleTimeline.module.less"

export const ScheduleTimeline: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.currentTimeWrapper}>
                <Normaltekst className={style.currentTimeClock}>12:12</Normaltekst>
                <div className={style.currentTimeMarker} />
            </div>
            <div className={style.timelineWrapper}>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Navn Navnesen</Undertittel>
                    <Undertittel className={style.patientAppointment}>12:00</Undertittel>
                    <Normaltekst className={style.patientAge}>75 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Kari Nordmann</Undertittel>
                    <Undertittel className={style.patientAppointment}>12:15</Undertittel>
                    <Normaltekst className={style.patientAge}>69 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Ola Nordmann</Undertittel>
                    <Undertittel className={style.patientAppointment}>12:30</Undertittel>
                    <Normaltekst className={style.patientAge}>23 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Espen Askeladd</Undertittel>
                    <Undertittel className={style.patientAppointment}>12:45</Undertittel>
                    <Normaltekst className={style.patientAge}>8 år</Normaltekst>
                </div>
            </div>
        </div>)
}