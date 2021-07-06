import React, { useEffect, useState } from 'react';
import { Message } from '@pasientjournal.no/api-interfaces';
import Navbar from '../components/navbar';
import Composition from '../components/composition';
import { IQuestionnaire, Questionnaire_ItemTypeKind, IComposition, ICondition, IComposition_Section, CompositionStatusKind, ICodeableConcept, IReference } from '@ahryman40k/ts-fhir-types/lib/R4';

export const App = () => {
    const [m, setMessage] = useState<Message>({ message: '' });

    useEffect(() => {
        fetch('/api')
            .then((r) => r.json())
            .then(setMessage);
    }, []);

    const compositionPractitioner: IReference[] = [{}]

    const conditionPatient: IReference = {};

    const conditionType: ICodeableConcept = {}

    const condition: ICondition[] = [{
        resourceType: "Condition",
        subject: conditionPatient,
        code: conditionType,
        recordedDate: "2021-05-04",
        recorder: compositionPractitioner[0],
    }]

    const sectionReference: IReference[] = [{
        reference: "http://localhost:8888/fhir/Patient/1"
    }]

    const section: IComposition_Section[] = [{
        entry: sectionReference,
        title: "Tittel på tilstand",
    }]

    const compositionType: ICodeableConcept = {

    }


    const composition: IComposition = {
        resourceType: "Composition",
        type: compositionType,
        author: compositionPractitioner,
        status: CompositionStatusKind._final,
        date: "2021-05-04",
        title: "Dette er en tittel",
        section: section,
    }
    const questionnaire: IQuestionnaire = {
        resourceType: "Questionnaire",
        item: [
            { linkId: "1", text: "Hva er navnet ditt?", type: Questionnaire_ItemTypeKind._string },
            { linkId: "2", text: "Hvor gammel er du?", type: Questionnaire_ItemTypeKind._integer },

        ]

    }

    // const questionnaireResponse: IQuestionnaireResponse 


    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center' }}>
                <Composition composition={composition} />
            </div>
            <div>{m.message}</div>
        </>
    );
};

export default App;
