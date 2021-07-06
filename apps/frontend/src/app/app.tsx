import React, { useEffect, useState } from 'react';
import { Message } from '@pasientjournal.no/api-interfaces';
import Navbar from '../components/navbar';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch('/api/app')
      .then((r) => console.log(r));
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
      <div>{JSON.stringify(patient)}</div>
    </>
  );
};

export default App;
