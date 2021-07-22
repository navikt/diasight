import React from 'react';
import { PatientSearch } from '../components/patientSearch/patientSearch';
import { ScheduleTimeline } from '../components/schedule/scheduleTimeline';
import style from "./patient-list-layout.module.less";

export const PatientListLayout = () => {
    return (
        <div className={style.searchBar}>
            <PatientSearch />
            <ScheduleTimeline />
        </div>
    );
}
