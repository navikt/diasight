import { ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import React from "react";
import { FC } from "react";
import { TaskCard } from "./task-card";
import style from "./task-overview.module.less";

interface IProps {
    tasks: ITask[];
    practitionerId: string;
}

export const TaskOverview: FC<IProps> = ({ tasks, practitionerId }) => {
    return (
        <div className={style.wrapper}>
            {tasks?.map((task, index) => {
                return task.id ? (
                    <TaskCard key={index} taskId={task.id} ownerId={practitionerId} />
                ) : null;
            })}
        </div>
    );
};
