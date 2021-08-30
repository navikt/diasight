import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/navbar";
import { OverviewLayout, PatientDetailLayout, PatientListLayout, UnauthenticatedLayout } from "../layouts";

import style from "./app.module.less";
import { useAppContext } from "../contexts/app-context";

export const App = () => {
    const { user, authState, loading } = useAppContext();
    if (loading) return <div>loading...</div>;
    if (!loading && !authState?.isAuthenticated) return <UnauthenticatedLayout loginUrl={authState?.loginUrl || "/"} />;
    return (
        <>
            {user && <Navbar user={user} logoutUrl={authState?.logoutUrl || "/"} />}
            <div className={style.content}>
                <Route exact path="/oversikt">
                    <OverviewLayout />
                </Route>
                <Route exact path="/pasient">
                    <PatientListLayout />
                </Route>
                <Route exact path="/pasient/:id">
                    <PatientDetailLayout />
                </Route>
                <Route exact path="/timeplan">
                    <h1>timeplan</h1>
                </Route>
                <Route exact path="/inbox">
                    <h1>inbox</h1>
                </Route>
                <Route exact path="/instillinger">
                    <h1>instillinger</h1>
                </Route>
            </div>
        </>
    );
};

export default App;
