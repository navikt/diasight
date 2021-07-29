import React from 'react';
import { PatientSearch } from '../components/patientSearch/patient-search';
import { ScheduleTimeline } from '../components/schedule/schedule-timeline';
import style from "./patient-list-layout.module.less";

export const PatientListLayout = () => {
    return (
        <div className={style.searchBar}>
            <PatientSearch />
            <ScheduleTimeline />
        </div>
    );
}
