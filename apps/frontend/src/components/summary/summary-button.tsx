import { Systemtittel, Undertekst } from "nav-frontend-typografi";
import React, { FC, useContext } from "react";
import { SummaryContext } from "../../layouts/contexts/summary-context";
import style from "./summary.module.less";

interface IProps {
    showSummary: () => void;
}

export const SummaryButton: FC<IProps> = ({ showSummary }) => {
    const { changes } = useContext(SummaryContext);

    return (
        <div onClick={showSummary} className={style.summaryButton}>
            <Undertekst>Oppsummering</Undertekst>
            <Systemtittel>{changes.length}</Systemtittel>
        </div>
    );
};
