import { IBundle_Entry, IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { IBundle, IComposition } from '../models';

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

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to frontend!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Extensible Build Framework"
        />
      </div>
      <p>Found {patientResult?.total} patients:</p>
      <ol start="0">
        {patientResult ? patientResult.map((entry) => {
          return <li key={patientResult.indexOf(entry)}>{JSON.stringify(entry.name)}</li>
        }) : null}
      </ol>
    </>
  );
};

export default App;
