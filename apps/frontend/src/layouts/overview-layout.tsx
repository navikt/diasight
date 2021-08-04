import { Sidetittel, Element } from "nav-frontend-typografi";
import React, { FC } from "react";
import { TaskOverview } from "../components/overview/task-overview";
import { ScheduleList } from "../components/schedule/schedule-list";
import { useTask } from "./hooks/use-task";
import style from "./overview-layout.module.less";

export const OverviewLayout: FC = () => {
    const practitionerId = "2";

    const { tasks, isLoading, isError } = useTask(practitionerId);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>
    if (!tasks) return <div>No data</div>

    const hospitalTasks = tasks ? tasks.filter(
        (task) => task?.focus?.type === "DiagnosticReport"
    ) : tasks;

    const navTasks = tasks ? tasks.filter(
        (task) => task?.requester?.reference === "Organization/12"
    ) : tasks;

    return (
        <div className={style.overviewWrapper}>
            <div className={style.dailyMessage}>
                <Sidetittel>
                    Geir Nystøl, i dag har du <span className={style.dynamicField}>4 pasienter</span>.
                    <br />
                    <br />
                    Du har mottat <span className={style.dynamicField}>1 svar på blodprøve </span>
                    og <span className={style.dynamicField}>1 svar på henvisning</span> fra sykehuset.
                    <br />
                    <br />
                    Du må skrive <span className={style.dynamicField}>1 utfyllende sykemelding </span>
                    og <span className={style.dynamicField}>1 utfyllende arbeidsavklaringsskjema</span> til NAV.
                </Sidetittel>
            </div>
            <div className={style.notifications}>
                <Element>Fra sykehus</Element>
                <TaskOverview tasks={hospitalTasks} practitionerId={practitionerId} />
            </div>
            <div className={style.calendar}>
                <ScheduleList />
            </div>
            <div className={style.notifications}>
                <Element>Fra NAV</Element>
                <TaskOverview tasks={navTasks} practitionerId={practitionerId} />
            </div>
        </div>
    );
}