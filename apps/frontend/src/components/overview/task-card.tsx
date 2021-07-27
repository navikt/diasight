import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { useTaskCard } from "./hooks/use-task-card";
import { bundleToCard } from "./utils/resource-to-card";

interface IProps {
    taskId: string,
    ownerId: string,
}

export const TaskCard: FC<IProps> = ({ taskId, ownerId }) => {
    const { card, isLoading, isError } = useTaskCard(taskId, ownerId);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (card) {
        const resource = bundleToCard(card);

        return (
            <div>
                <Undertekst>Mottat {resource.date}</Undertekst>
                <Undertekst>{resource.title}</Undertekst>
                <Undertittel>{resource.subject}</Undertittel>
                <Undertekst>{resource.details}</Undertekst>
            </div>
        )
    }
    return null;
}