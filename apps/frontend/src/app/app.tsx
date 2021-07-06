import React, { useEffect, useState } from 'react';
import { Message } from '@pasientjournal.no/api-interfaces';
import Navbar from '../components/navbar';
import Composition from '../components/composition';
import { CompositionStatus, IComposition, ISection, ICondition } from '../models';
import { Questionnaire } from '../components/questionnaire/questionnaire';
import { IQuestionnaire, IQuestionnaireResponse, Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import { Answer } from '../components/itemAnswer/itemAnswer';

export const App = () => {
    const [m, setMessage] = useState<Message>({ message: '' });

    useEffect(() => {
        fetch('/api')
            .then((r) => r.json())
            .then(setMessage);
    }, []);

    const condition: ICondition = {
        code: "AA00",
        title: "Kronisk obstruktiv lungesykdom",
        recordedDate: new Date(),
        recorder: "Ola Normann"
    }

    const section: ISection = {
        entry: condition,
    }

    const composition: IComposition = {
        status: CompositionStatus.Final,
        date: new Date(),
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
                <Questionnaire questionnaire={questionnaire} />

            </div>
            <div>{m.message}</div>
        </>
    );
};

export default App;
