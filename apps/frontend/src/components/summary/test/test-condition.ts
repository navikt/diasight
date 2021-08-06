export const testCondition = {
    resourceType: "Condition",
    id: "4",
    meta: {
        versionId: "2",
        lastUpdated: "2021-07-21T14:16:43.337+00:00",
        source: "#ac17A4opDM3CQMTn",
    },
    code: {
        coding: [
            {
                system: "ICPC",
                version: "2B",
                code: "A81",
            },
        ],
        text: "Multiple skader/traumer",
    },
    subject: {
        reference: "Patient/1",
        type: "Patient",
    },
    onsetDateTime: "2018-12-13",
    recordedDate: "2021-12-20",
    recorder: {
        reference: "Practitioner/2",
        type: "Practitioner",
    },
};
