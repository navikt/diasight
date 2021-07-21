import { Sidetittel, Element } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./overview-layout.module.less";


export const OverviewLayout: FC = () => {


    return (
        <div className={style.overviewWrapper}>
            <div className={style.dailyMessage}>
                <Sidetittel>
                    Geir Nystøl, i dag har du <span className={style.dynamicField}>6 pasienter</span>,
                    <br />
                    du har mottat <span className={style.dynamicField}>4 epikriser</span> fra sykehuset
                    <br />
                    og må skrive <span className={style.dynamicField}>2 legeerklæringer</span> til NAV.
                </Sidetittel>
            </div>
            <div className={style.notifications}>
                <Element>Fra sykehus</Element>
                <div></div>
            </div>
            <div className={style.calendar}>
                <Element>Dato</Element>
                <div></div>
            </div>
            <div className={style.notifications}>
                <Element>Fra NAV</Element>
                <div></div>
            </div>
        </div>
    );
}