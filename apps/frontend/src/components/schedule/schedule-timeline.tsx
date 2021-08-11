import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import { Link } from "wouter";
import style from "./schedule-timeline.module.less"

export const ScheduleTimeline: FC = () => {
    // For now, all of the appointments are hardcoded
    // The developers and designers should communicate here
    // Find out how many pixels each appointment should be
    // And calculate where the current time marker should be 

    return (
        <div className={style.wrapper}>
            <div className={style.currentTimeWrapper}>
                <div className={style.currentTimeCircle}></div>
                <div className={style.currentTimeMarker} />
            </div>
            <div className={style.timelineWrapper}>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Sofie Fagermo</Undertittel>
                    <Undertittel className={style.patientAppointment}>11:30</Undertittel>
                    <Normaltekst className={style.patientAge}>22 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Daniel Salvesen</Undertittel>
                    <Undertittel className={style.patientAppointment}>11:45</Undertittel>
                    <Normaltekst className={style.patientAge}>48 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Link href={"/pasient/1"}>
                        <Undertittel className={style.patientName}>
                            <span style={{ cursor: "pointer" }}>Ola Normann</span>
                        </Undertittel>
                    </Link>
                    <Undertittel className={style.patientAppointment}>12:15</Undertittel>
                    <Normaltekst className={style.patientAge}>72 år</Normaltekst>
                </div>
                <div className={style.timelineEntry}>
                    <Undertittel className={style.patientName}>Maja Ingebretsen</Undertittel>
                    <Undertittel className={style.patientAppointment}>12:30</Undertittel>
                    <Normaltekst className={style.patientAge}>32 år</Normaltekst>
                </div>
            </div>
        </div>
    );
};
