import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export const App = () => {
  const [patientResult, setPatientResult] = useState<IPatient>(null);

  useEffect(() => {
    fetch('/api/Patient')
      .then((r) => r.json().then(patient => {
        console.log(patient);
        setPatientResult(patient);
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
      <h4>Found {patientResult?.total} patients</h4>
      <ul>
        {patientResult.entry.map((entry) => {
          return <li>{entry.resource.name[0].given[0]}</li>
        })}
      </ul>
    </>
  );
};

export default App;
