import React from 'react';
import { PatientSearch } from '../components/patientSearch/patientSearch';
import style from "./patient-list-layout.module.less";

export const PatientListLayout = () => {
    return (
        <div className={style.searchBar}>
            <PatientSearch />
        </div>
    );
}
