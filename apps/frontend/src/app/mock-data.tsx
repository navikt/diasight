export const mockPatient = {
    "resourceType": "Patient",
    "meta": {
        "security": [
            {
                "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                "code": "N",
                "display": "normal"
            }
        ]
    },
    "extension": [
        {
            "extension": [
                {
                    "url": "code",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "urn:iso:std:iso:3166",
                                "code": "NO",
                                "display": "Norge"
                            }
                        ]
                    }
                }
            ],
            "url": "http://hl7.org/fhir/StructureDefinition/patient-citizenship"
        }
    ],
    "identifier": [
        {
            "system": "urn:oid:2.16.578.1.12.4.1.4.1",
            "value": "28038203977"
        }
    ],
    "active": true,
    "name": [
        {
            "family": "Aase",
            "given": [
                "Julie"
            ]
        }
    ],
    "gender": "female",
    "birthDate": "1982-03-28",
    "deceasedBoolean": false,
    "maritalStatus": {
        "coding": [
            {
                "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                "code": "M",
                "display": "Married"
            }
        ]
    }
};