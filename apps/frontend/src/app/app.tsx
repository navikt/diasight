import React from 'react';
import { Route } from 'wouter';
import Navbar from '../components/navbar';
import { OverviewLayout } from '../layouts';
import { PatientDetailLayout } from '../layouts/patient-detail-layout';

import style from "./app.module.less";

export const App = () => {
    interface IPatientRouteParams {
        id: number;
    }

    return (
        <>
            <Navbar />
            <div className={style.content}>
                <Route path="/oversikt"><OverviewLayout /></Route>
                <Route path="/pasient"><h1>Pasient liste</h1></Route>
                <Route path="/pasient/:id">{(params: IPatientRouteParams) => { return <PatientDetailLayout id={params.id} /> }}</Route>
                <Route path="/timeplan"><h1>timeplan</h1></Route>
                <Route path="/inbox"><h1>inbox</h1></Route>
                <Route path="/instillinger"><h1>instillinger</h1></Route>
            </div>
        </>
    );
};

export default App;
