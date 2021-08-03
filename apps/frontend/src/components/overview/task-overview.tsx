import { ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Sidetittel, Element } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { TaskCard } from "./task-card";
import style from "./task-overview.module.less"

interface IProps {
    tasks: ITask[],
    practitionerId: string,
}

export const TaskOverview: FC<IProps> = ({ tasks, practitionerId }) => {

    const hospitalTasks = tasks ? tasks.filter(
        (task) => task?.focus?.type === "DiagnosticReport"
    ) : null;

    const navTasks = tasks ? tasks.filter(
        (task) => task?.requester?.reference === "Organization/12"
    ) : null;


    return (
        <>
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
                <div className={style.wrapper}>
                    {hospitalTasks?.map((task, index) => {
                        return task.id ? (
                            <TaskCard
                                key={index}
                                taskId={task.id}
                                ownerId={practitionerId} />
                        ) : null;
                    })}
                </div>
            </div>
            <div className={style.notifications}>
                <Element>Fra NAV</Element>
                <div className={style.wrapper}>
                    {navTasks?.map((task, index) => {
                        return task.id ? (
                            <TaskCard
                                key={index}
                                taskId={task.id}
                                ownerId={practitionerId} />
                        ) : null;
                    })}
                </div>
            </div>
        </>
    )
}