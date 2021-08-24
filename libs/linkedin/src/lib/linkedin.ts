export function linkedin(): string {
    return "linkedin";
}

export interface LinkedinUser {
    provider: string,
    id: string,
    name: {
        givenName: string,
        familyName: string,
    }
    displayName: string,
    photos: [{
        value: string,
    }],
    emails: [{
        value: string,
    }]
}
