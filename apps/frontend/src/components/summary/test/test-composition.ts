import { IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

export const testComposition: IComposition = {
    resourceType: "Composition",
    type: {
        coding: [
            {
                system: "http://loinc.org",
                code: "11503-0",
            },
        ],
        text: "Medical record",
    },
    author: [
        {
            reference: "Practitioner/2",
            type: "Practitioner",
        },
    ],
};

/*{
    resourceType: "Composition",
    id: "9",
    status: "preliminary",
    type: {
        coding: [
            {
                system: "http://loinc.org",
                code: "11503-0",
            },
        ],
        text: "Medical record",
    },
    subject: {
        reference: "Patient/1",
        type: "Patient",
    },
    date: "2021-07-09",
    author: [
        {
            reference: "Practitioner/2",
            type: "Practitioner",
        },
    ],
    title: "Bilulykke",
    section: [
        {
            title: "Multiple skader/traumer",
            code: {
                coding: [
                    {
                        system: "http://loinc.org",
                        code: "11329-0",
                    },
                ],
                text: "History of general Narrative - Reported",
            },
            focus: {
                reference: "Condition/4",
                type: "Condition",
                display: "Multiple skader/traume",
            },
            orderedBy: {
                coding: [
                    {
                        code: "event-date",
                    },
                ],
            },
            entry: [
                {
                    reference: "Observation/7",
                    type: "Observation",
                    display: "Ortostatisk blodtrykksmåling",
                },
                {
                    reference: "ServiceRequest/8",
                    type: "ServiceRequest",
                    display: "Måling av transdiafragmale trykk ved voluntær ventilasjon",
                },
                {
                    reference: "MedicationRequest/6",
                    type: "MedicationRequest",
                    display: "Paracetamol",
                },
            ],
        },
        {
            title: "Streptokokkhals",
            code: {
                coding: [
                    {
                        system: "http://loinc.org",
                        code: "11329-0",
                    },
                ],
                text: "History of general Narrative - Reported",
            },
            focus: {
                reference: "Condition/5",
                type: "Condition",
                display: "Streptokokkhals",
            },
            orderedBy: {
                coding: [
                    {
                        code: "event-date",
                    },
                ],
            },
        },
    ],
};*/
