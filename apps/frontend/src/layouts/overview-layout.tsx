import { Sidetittel, Element } from "nav-frontend-typografi";
import React, { FC } from "react";
import { TaskOverview } from "../components/overview/task-overview";
import { ScheduleList } from "../components/schedule/schedule-list";
import { useTask } from "./hooks/use-task";
import style from "./overview-layout.module.less";

export const OverviewLayout: FC = () => {
    // Temporary constant for the id of the practitioner that is currently logged in
    const practitionerId = "2";

    // This hook fetches all of the tasks that belong to this practitioner
    const { tasks, isLoading, isError } = useTask(practitionerId);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;
    if (!tasks) return <div>No data</div>;

    const hospitalTasks = tasks
        ? tasks.filter((task) => task?.focus?.type === "DiagnosticReport")
        : tasks;

    const navTasks = tasks
        ? tasks.filter((task) => task?.requester?.reference === "Organization/12")
        : tasks;

    const hospitalCount = hospitalTasks.reduce((count, task) => {
        const currentDescription = task.description;
        if (!currentDescription) {
            return count
        }
        const currentCount = (count as any)[currentDescription] || 0;
        const newCount = currentCount + 1;

        return { ...count, [currentDescription]: newCount };
    }, {});

    const navCount = hospitalTasks.reduce((count, task) => {
        const currentDescription = task.description;
        if (!currentDescription) {
            return count
        }
        const currentCount = (count as any)[currentDescription] || 0;
        const newCount = currentCount + 1;

        return { ...count, [currentDescription]: newCount };
    }, {});

    return (
        <div className={style.overviewWrapper}>
            <div className={style.dailyMessage}>
                {/* Should probably ble refactored into task-overview.tsx */}
                {/* Has not happened yet because of css layout problems */}
                <Sidetittel>
                    {/* Number of patients is hardcoded for now */}
                    Geir Nystøl, i dag har du <span className={style.dynamicField}>4 pasienter</span>.<br /><br />

                    {/* Hospital task descriptions are hardcoded for now */}
                    Du har mottat <span className={style.dynamicField}>1 svar på blodprøve </span> og{" "}
                    <span className={style.dynamicField}>1 svar på henvisning</span> fra sykehuset.<br /><br />

                    {/* NAV task descriptions are hardcoded for now */}
                    Du må skrive <span className={style.dynamicField}>1 utfyllende sykemelding </span> og{" "}
                    <span className={style.dynamicField}>1 utfyllende arbeidsavklaringsskjema</span> til NAV.
                </Sidetittel>
            </div>
            <div className={style.notifications}>
                <Element>Fra sykehus</Element>
                {/* TaskOverview can be found in the overview components folder */}
                <TaskOverview tasks={hospitalTasks} practitionerId={practitionerId} />
            </div>
            <div className={style.calendar}>
                {/* ScheduleList can be found in the schedule components folder */}
                <ScheduleList />
            </div>
            <div className={style.notifications}>
                <Element>Fra NAV</Element>
                {/* TaskOverview can be found in the overview components folder */}
                <TaskOverview tasks={navTasks} practitionerId={practitionerId} />
            </div>
        </div>
    );
};
