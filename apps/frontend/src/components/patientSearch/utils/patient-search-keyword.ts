import { formatBirthdate } from "./patient-birthdate";

export const findQueryString = (searchKeyword: string): string => {
    const birthdate = formatBirthdate(searchKeyword);
    const personNumber = new RegExp(/[0-9]{11}/);

    if (birthdate !== "") {
        return "?birthdate=" + birthdate;
    } else if (personNumber.test(searchKeyword)) {
        return "?identifier=" + searchKeyword;
    } else {
        return "?name=" + searchKeyword;
    }
};
