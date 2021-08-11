import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./schedule-timeline.module.less";

export const ScheduleTimeline: FC = () => {
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
                    <Undertittel className={style.patientName}>Ola Normann</Undertittel>
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
