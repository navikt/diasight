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

    return (
        <div className={style.overviewWrapper}>
            <div>
                <TaskOverview tasks={tasks} practitionerId={practitionerId} />
            </div>
            <div>
                <ScheduleList />
            </div>
        </div>
    );
}