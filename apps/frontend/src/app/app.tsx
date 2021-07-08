import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { IBundle } from '../models';

export const App = () => {
  const [patientResult, setPatientResult] = useState<IPatient[]>();

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
      <p>Found the following patients:</p>
      <ol>
        {patientResult ? patientResult.map((entry) => {
          return <li key={patientResult.indexOf(entry)}>{JSON.stringify(entry.name)}</li>
        }) : null}
      </ol>
    </>
  );
};

export default App;
