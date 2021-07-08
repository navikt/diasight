import { IBundle, IQuestionnaireResponse } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export const App = () => {
  const [questionnaireResponseResult, setQuestionnaireResponseResult] = useState<IQuestionnaireResponse[]>();

  useEffect(() => {
    fetch('/api/QuestionnaireResponse')
      .then((r) => r.json())
      .then((bundle: IBundle) => {
        const questionnaireResponses: IQuestionnaireResponse[] = [];
        if (bundle.entry) {
          bundle.entry.forEach((entry: any) => {
            questionnaireResponses.push(entry.resource as IQuestionnaireResponse);
          })
          console.log(bundle);
          setQuestionnaireResponseResult(questionnaireResponses);
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
      {questionnaireResponseResult ?
        <>
          <p>Found the following questionnaire responses:</p>
          <ol>
            {questionnaireResponseResult.map((entry) => {
              return <li key={questionnaireResponseResult.indexOf(entry)}>
                {JSON.stringify(entry.questionnaire)}
              </li>
            })}
          </ol>
        </> :
        <p>No questionnaire responses found</p>}
    </>
  );
};

export default App;
