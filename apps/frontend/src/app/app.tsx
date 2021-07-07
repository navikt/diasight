import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export const App = () => {
  const [patientResult, setPatientResult] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/Patient')
      .then((r) => r.json().then(patient => {
        console.log(patient);
        setPatientResult(patient);
        setLoading(false);
      }));
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
        {!loading ? patientResult.entry.map((entry) => {
          return <li>{entry.resource.name[0].given[0]} {entry.resource.name[0].family}</li>
        }) : null}
      </ol>
    </>
  );
};

export default App;
