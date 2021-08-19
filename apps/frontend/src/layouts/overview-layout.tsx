import { Element, Sidetittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import { TaskOverview } from "../components/overview/task-overview";
import { ScheduleList } from "../components/schedule/schedule-list";
import { useTask } from "./hooks/use-task";
import style from "./overview-layout.module.less";
import { AlertStripeInfo, AlertStripeFeil } from "nav-frontend-alertstriper";

export const OverviewLayout: FC = () => {
    // Temporary constant for the id of the practitioner that is currently logged in
    const practitionerId = "489036";

    // This hook fetches all of the tasks that belong to this practitioner
    const { tasks, isLoading, isError } = useTask(practitionerId);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <AlertStripeFeil>Error</AlertStripeFeil>;

    const hospitalTasks = tasks
        ? tasks.filter((task) => task?.focus?.type === "DiagnosticReport")
        : [];

    const navTasks = tasks
        ? tasks.filter((task) => task?.requester?.reference === "Organization/12")
        : [];

    const hospitalCount = hospitalTasks.reduce((count, task) => {
        const currentDescription = task.description;
        if (!currentDescription) {
            return count;
        }
        const currentCount = (count as any)[currentDescription] || 0;
        const newCount = currentCount + 1;

        return { ...count, [currentDescription]: newCount };
    }, {});

    const navCount = hospitalTasks.reduce((count, task) => {
        const currentDescription = task.description;
        if (!currentDescription) {
            return count;
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
                    Geir Nystøl, i dag har du <span className={style.dynamicField}> 6 pasienter</span>, <br />
                    du har mottat <span className={style.dynamicField}> 3 epikriser </span>,
                    <span className={style.dynamicField}> 1 labresultat</span> <br />
                    og må skrive <span className={style.dynamicField}> 2 erklæringer</span>.
                </Sidetittel>
            </div>
            <div className={style.notifications}>
                <Element>Fra sykehus og spesialist</Element>
                <TaskOverview tasks={hospitalTasks} practitionerId={practitionerId} />
            </div>
            <div className={style.calendar}>
                {/* ScheduleList can be found in the schedule components folder */}
                <ScheduleList />
            </div>
            <div className={style.notifications}>
                <Element>Fra NAV og annet ikke medisinsk personell</Element>
                <TaskOverview tasks={navTasks} practitionerId={practitionerId} />
            </div>
        </div>
    );
};
