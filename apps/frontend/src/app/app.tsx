import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export const App = () => {
  const [patientResult, setPatientResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/Patient')
      .then((r) => r.json().then(patient => setPatientResult(patient)
      ));
  }, []);

  return (
    <>
    <Navbar/>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to frontend!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Extensible Build Framework"
        />
      </div>
      <div>Found {patientResult?.total}</div>
    </>
  );
};

export default App;
