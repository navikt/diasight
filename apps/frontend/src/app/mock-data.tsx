export const mockPatient = {
    "resourceType": "Bundle",
    "id": "a034a662-b80b-42df-be5f-ac2a3c615886",
    "meta": {
        "lastUpdated": "2021-07-07T12:23:13.994+00:00"
    },
    "type": "searchset",
    "total": 3,
    "link": [
        {
            "relation": "self",
            "url": "http://localhost:8080/fhir/Patient"
        }
    ],
    "entry": [
        {
            "fullUrl": "http://localhost:8080/fhir/Patient/1",
            "resource": {
                "resourceType": "Patient",
                "id": "1",
                "meta": {
                    "versionId": "2",
                    "lastUpdated": "2021-07-07T08:21:42.802+00:00",
                    "source": "#4D1quqndZEWSQM0x",
                    "security": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                            "code": "N",
                            "display": "normal"
                        }
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">Jenny <b>AASE </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>28038203977</td></tr><tr><td>Date of birth</td><td><span>28 March 1982</span></td></tr></tbody></table></div>"
                },
                "extension": [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/patient-citizenship",
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
                        ]
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
                            "Jenny"
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
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "fullUrl": "http://localhost:8080/fhir/Patient/2",
            "resource": {
                "resourceType": "Patient",
                "id": "2",
                "meta": {
                    "versionId": "2",
                    "lastUpdated": "2021-07-07T08:22:07.837+00:00",
                    "source": "#2VMavN9HzrLprFMx",
                    "security": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                            "code": "N",
                            "display": "normal"
                        }
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">Julie <b>AASE </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>28038203977</td></tr><tr><td>Date of birth</td><td><span>28 March 1982</span></td></tr></tbody></table></div>"
                },
                "extension": [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/patient-citizenship",
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
                        ]
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
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "fullUrl": "http://localhost:8080/fhir/Patient/3",
            "resource": {
                "resourceType": "Patient",
                "id": "3",
                "meta": {
                    "versionId": "1",
                    "lastUpdated": "2021-07-07T07:29:33.726+00:00",
                    "source": "#DrRX6JJksLU4a6hK",
                    "security": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
                            "code": "N",
                            "display": "normal"
                        }
                    ]
                },
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">Jens <b>AASE </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>28038203977</td></tr><tr><td>Date of birth</td><td><span>28 March 1982</span></td></tr></tbody></table></div>"
                },
                "extension": [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/patient-citizenship",
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
                        ]
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
                            "Jens"
                        ]
                    }
                ],
                "gender": "male",
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
            },
            "search": {
                "mode": "match"
            }
        }
    ]
};