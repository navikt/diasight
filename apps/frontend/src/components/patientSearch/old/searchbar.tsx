import { IBundle, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    searchKeyword: string
}

function formatBirthdate(searchKeyword: string): string {
    const birthdateYearFirst = new RegExp(/[0-9]{4}[.\-/][0-9]{2}[.\-/][0-9]{2}/);
    const birthdateYearLast = new RegExp(/[0-9]{2}[.\-/][0-9]{2}[.\-/][0-9]{4}/);

    if (birthdateYearLast.test(searchKeyword)) {
        return reverseBirthdate(searchKeyword);
    }

    if (birthdateYearFirst.test(searchKeyword)) {
        return punctuateBirthdate(searchKeyword);
    }

    console.log("Ugyldig fødselsdato");
    return "";
}

function reverseBirthdate(birthdate: string): string {
    birthdate = birthdate.split("-").reverse().join("-");
    birthdate = birthdate.split(".").reverse().join("-");
    birthdate = birthdate.split("/").reverse().join("-");
    console.log("birthdate unreversed: " + birthdate)
    return birthdate;
}

function punctuateBirthdate(birthdate: string): string {
    birthdate = birthdate.split(".").join("-");
    birthdate = birthdate.split("/").join("-");
    console.log("birthdate punctuated: " + birthdate)
    return birthdate;
}

const Searchbar = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [patientResult, setPatientResult] = useState<IPatient[]>();
    const [loading, setLoading] = useState(true);

    return (
        <>
            <h1>Pasient liste</h1>
            <form onSubmit={handleSubmit((data) => {
                //console.log(data);
                fetch("/api/Patient?birthdate=" + formatBirthdate(data.searchKeyword))
                    .then((response) => response.json())
                    .then((bundle: IBundle) => {
                        console.log(bundle);
                        const patients: IPatient[] = [];
                        bundle.entry?.forEach((entry: any) => {
                            patients.push(entry.resource as IPatient);
                        })
                        setPatientResult(patients);
                        setLoading(false);
                    })
            })}>
                <input {...register("searchKeyword")} id="searchKeyword" />
                <input type="submit"></input>
            </form >
            <p>{ }</p>
        </>
    )
}

export default Searchbar;