export const dateReverser = (date: string): string => {
    const splitDate = date.substr(0, 10).split("-");
    return splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
};
