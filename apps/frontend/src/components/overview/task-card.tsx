import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { useTaskCard } from "./hooks/use-task-card";
import { bundleToCard } from "./utils/resource-to-card";
import style from "./task-overview.module.less"
import { Link } from "wouter";
import { referenceToUrl } from "./hooks/reference-to-url";

interface IProps {
    taskId: string;
    ownerId: string;
}

export const TaskCard: FC<IProps> = ({ taskId, ownerId }) => {
    const { card, isLoading, isError } = useTaskCard(taskId, ownerId);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (card) {
        const resource = bundleToCard(card);

        return (
            <div className={style.card}>
                <Undertekst>Mottat {resource.date}</Undertekst>
                <Undertekst>{resource.title}</Undertekst>
                <Link href={referenceToUrl(resource.link)}>
                    <Undertittel className={style.patientLink}>{resource.subject}</Undertittel>
                </Link>
                <Undertekst>{resource.details}</Undertekst>
            </div>
        );
    }
    return null;
};
