import React from "react";
import { FC } from "react";
import { useTask } from "./hooks/use-task";
import { TaskCard } from "./task-card";
import style from "./task-overview.module.less"

interface IProps {
    practitionerId: string,
}

export const TaskOverview: FC<IProps> = ({ practitionerId }) => {
    const { tasks, isLoading, isError } = useTask(practitionerId);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    return (
        <div className={style.wrapper}>
            <hr />
            {tasks?.entry?.map((task, index) => {
                return task.resource?.id ? (
                    <>
                        <TaskCard
                            key={index}
                            taskId={task.resource.id}
                            ownerId={practitionerId} />
                        <hr />
                    </>
                ) : null;
            })}
        </div>
    )
}