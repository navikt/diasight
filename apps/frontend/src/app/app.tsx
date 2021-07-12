import { IBundle, IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { mockPatient } from './mock-data';

export const App = () => {
  const [patientResult, setPatientResult] = useState<IPatient[]>();

  useEffect(() => {
    fetch('/api/Patient', {
      method: 'POST',
      // body: JSON.stringify({
      //   query: mockPatient
      // })
    })
      .then((r) => r.json())
      .then((bundle: IBundle) => {
        const patients: IPatient[] = [];
        if (bundle.entry) {
          bundle.entry.forEach((entry: any) => {
            patients.push(entry.resource as IPatient);
          })
          console.log(bundle);
          setPatientResult(patients);
        }
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
      {patientResult
        ? <>
          <p>Found the following questionnaire responses:</p>
          <ol>
            {patientResult.map((entry) => {
              return <li key={patientResult.indexOf(entry)}>
                {JSON.stringify(entry.name)}
              </li>
            })}
          </ol>
        </>
        : <p>No questionnaire responses found</p>}
      <p></p>
    </>
  );
};

export default App;
