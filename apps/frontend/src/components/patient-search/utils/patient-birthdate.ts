const reverseBirthdate = (birthdate: string): string => {
    birthdate = birthdate.split("-").reverse().join("-");
    birthdate = birthdate.split(".").reverse().join("-");
    birthdate = birthdate.split("/").reverse().join("-");
    return birthdate;
};

const punctuateBirthdate = (birthdate: string): string => {
    birthdate = birthdate.split(".").join("-");
    birthdate = birthdate.split("/").join("-");
    return birthdate;
};

export const formatBirthdate = (searchKeyword: string): string => {
    const birthdateYearFirst = new RegExp(/[0-9]{4}[.\-/][0-9]{2}[.\-/][0-9]{2}/);
    const birthdateYearLast = new RegExp(/[0-9]{2}[.\-/][0-9]{2}[.\-/][0-9]{4}/);

    if (birthdateYearLast.test(searchKeyword)) {
        return reverseBirthdate(searchKeyword);
    }

    if (birthdateYearFirst.test(searchKeyword)) {
        return punctuateBirthdate(searchKeyword);
    }

    return "";
};
