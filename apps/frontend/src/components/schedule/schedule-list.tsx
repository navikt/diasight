import React, { FC } from "react";
import { Element, Systemtittel, Undertekst } from "nav-frontend-typografi";
import style from "./schedule-list.module.less";

export const ScheduleList: FC = () => {
    return (
        <div className={style.wrapper}>
            <Systemtittel>9-13 august</Systemtittel>
            <div className={style.currentTimeWrapper}>
                <div className={style.currentTimeCircle}></div>
                <div className={style.currentTimeMarker} />
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>11:30</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Sofie Fagermo</Element>
                    {/* <Undertekst className={style.patientAge}>22 år</Undertekst> */}
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>11:45</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Daniel Salvesen</Element>
                    {/*  <Undertekst className={style.patientAge}>48 år</Undertekst> */}
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>12:15</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Ola Normann</Element>
                    <Undertekst className={style.patientAge}>Mann, 72 år</Undertekst>
                </div>
            </div>
            <div className={style.timeBlock}>
                <Undertekst className={style.timeHour}>12:30</Undertekst>
                <div className={style.patient}>
                    <Element className={style.patientName}>Maja Ingebretsen</Element>
                    <Undertekst className={style.patientAge}>Kvinne, 32 år</Undertekst>
                </div>
            </div>
        </div>
    );
};
