import { IBundle, IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export const App = () => {
  const [questionnaireResult, setQuestionnaireResult] = useState<IQuestionnaire[]>();

  useEffect(() => {
    fetch('/api/Questionnaire')
      .then((r) => r.json())
      .then((bundle: IBundle) => {
        const questionnaires: IQuestionnaire[] = [];
        if (bundle.entry) {
          bundle.entry.forEach((entry: any) => {
            questionnaires.push(entry.resource as IQuestionnaire);
          })
          console.log(bundle);
          setQuestionnaireResult(questionnaires);
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
      {questionnaireResult ?
        <>
          <p>Found the following questionnaires:</p>
          <ol>
            {questionnaireResult.map((entry) => {
              return <li key={questionnaireResult.indexOf(entry)}>
                {JSON.stringify(entry.title)}
              </li>
            })}
          </ol>
        </> :
        <p>No questionnaires found</p>}
    </>
  );
};

export default App;
