const reverseBirthdate = (birthdate: string): string => {
    birthdate = birthdate.split("-").reverse().join("-");
    birthdate = birthdate.split(".").reverse().join("-");
    birthdate = birthdate.split("/").reverse().join("-");
    console.log("Birthdate reversed: " + birthdate);
    return birthdate;
};

const punctuateBirthdate = (birthdate: string): string => {
    birthdate = birthdate.split(".").join("-");
    birthdate = birthdate.split("/").join("-");
    console.log("Birthdate punctuated: " + birthdate);
    return birthdate;
};

export const formatBirthdate = (searchKeyword: string): string => {
    const birthdateYearFirst = new RegExp(
        /[0-9]{4}[.\-/][0-9]{2}[.\-/][0-9]{2}/
    );
    const birthdateYearLast = new RegExp(
        /[0-9]{2}[.\-/][0-9]{2}[.\-/][0-9]{4}/
    );

    if (birthdateYearLast.test(searchKeyword)) {
        return reverseBirthdate(searchKeyword);
    }

    if (birthdateYearFirst.test(searchKeyword)) {
        return punctuateBirthdate(searchKeyword);
    }

    console.log("Ugyldig fødselsdato");
    return "";
};
