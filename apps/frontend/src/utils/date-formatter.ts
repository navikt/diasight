export const dateToStrings = (date: Date) => {
    const month = monthToString(date.getMonth());
    const day: string = `${date.getDate()}`.length === 2 ? `${date.getDate()}` : `0${date.getDate()}`
    const year = date.getFullYear();

    return {
        day, month, year
    }
}

const monthToString = (month: number) => {
    switch (month) {
        case 0:
            return "januar";
        case 1:
            return "februar";
        case 2:
            return "mars";
        case 3:
            return "april";
        case 4:
            return "mai";
        case 5:
            return "juni";
        case 6:
            return "juli";
        case 7:
            return "august";
        case 8:
            return "september";
        case 9:
            return "oktober";
        case 10:
            return "november";
        case 11:
            return "desember";
        default:
            return "ukjent";
    }
}