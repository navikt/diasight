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

    // This hook fetches all of the resources that each task references
    const { card, isLoading, isError } = useTaskCard(taskId, ownerId);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (card) {
        // Takes in various resources and returns the relevant data from each
        const resource = bundleToCard(card, ownerId);

        return (
            <div className={style.card}>
                {/* The date at which the practitioner received this task */}
                <Undertekst>Mottat {resource.date}</Undertekst>

                {/* A description of what the task involves */}
                <Undertekst>{resource.title}</Undertekst>

                {/* The patient in which the task involves */}
                <Link href={referenceToUrl(resource.link)}>
                    <Undertittel className={style.patientLink}>{resource.subject}</Undertittel>
                </Link>

                {/* Further details about the task */}
                <Undertekst>{resource.details}</Undertekst>
            </div>
        );
    }
    return null;
};
