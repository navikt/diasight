import { IPatient, IResource } from "@ahryman40k/ts-fhir-types/lib/R4";

export const smartSettings = {
    clientId: "my-client-id",
    redirectUri: "/api/app",
    scope: "launch/patient patient/*.* openid fhirUser",
    iss: "http://localhost:8888/fhir",
};

export const examplePatient = {
    resourceType: "Patient",
    meta: {
        security: [
            {
                system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                code: "N",
                display: "normal",
            },
        ],
    },
    extension: [
        {
            extension: [
                {
                    url: "code",
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: "urn:iso:std:iso:3166",
                                code: "NO",
                                display: "Norge",
                            },
                        ],
                    },
                },
            ],
            url: "http://hl7.org/fhir/StructureDefinition/patient-citizenship",
        },
    ],
    identifier: [
        {
            system: "urn:oid:2.16.578.1.12.4.1.4.1",
            value: "28038203977",
        },
    ],
    active: true,
    name: [
        {
            family: "Aase",
            given: ["Jens"],
        },
    ],
    gender: "male",
    birthDate: "1982-03-28",
    deceasedBoolean: false,
    maritalStatus: {
        coding: [
            {
                system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                code: "M",
                display: "Married",
            },
        ],
    },
};
