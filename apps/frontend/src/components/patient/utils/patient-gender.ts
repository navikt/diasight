export const genderToNorwegian = (gender: string) => {
    switch (gender) {
        case "male":
            return "mann";
        case "female":
            return "kvinne";
        case "other":
            return "annet";
        default:
            return "ukjent";

    }
}