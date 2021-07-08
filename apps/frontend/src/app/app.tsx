import { ICodeableConcept, IReference, IComposition, IBundle, IPatient, } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import { Route } from 'wouter';
import Composition from '../components/composition';
import Navbar from '../components/navbar';
import Patient from '../components/patient';
import style from "./app.module.less";

export const App = () => {
    const [patientResult, setPatientResult] = useState<IPatient[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/Patient')
            .then((r) => r.json())
            .then((bundle: IBundle) => {
                const patients: IPatient[] = [];
                bundle.entry.forEach((entry: any) => {
                    patients.push(entry.resource as IPatient);
                })
                console.log(bundle);
                setPatientResult(patients);
                setLoading(false);
            });
    }, []);

    const cc: ICodeableConcept = {};

    const ref: IReference[] = [];

    const comp: IComposition = {
        resourceType: "Composition",
        type: cc,
        author: ref,
    };

    interface IPatientRouteParams {
        id: number;
    }

    return (
        <>
            <Navbar />
            <div className={style.content}>
                <Route path="/"><h1>Root</h1></Route>
                <Route path="/pasient/:id">{(params: IPatientRouteParams) => { return <Patient id={params.id} /> }}</Route>
                <Route path="/pasient"><h1>Pasient liste</h1></Route>
                <Route path="/timeplan"><h1>timeplan</h1></Route>
                <Route path="/inbox"><h1>inbox</h1></Route>
                <Route path="/instillinger"><h1>instillinger</h1></Route>
            </div>
        </>
    );
};

export default App;
