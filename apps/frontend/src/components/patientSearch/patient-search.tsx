import React, { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientResults } from "./patient-results";
import { Search } from "@navikt/ds-icons/cjs";
import style from "./patient-search.module.less";

type FormValues = {
    searchKeyword: string
}

export const PatientSearch: FC = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [searchValue, setSearchValue] = useState("");

    const search = (data: FormValues) => {
        setSearchValue(data.searchKeyword)
    }

    // The practitioner can look up patients using either...
    //      The given name of the patient OR
    //      The family name of the patient OR
    //      The complete person number of the patient OR
    //      The birthdate of the patient (in any order and separated by .-/)

    return <div className={style.wrapper}>
        <div className={style.searchWrapper}>
            <form className={style.searchForm} autoComplete="off" onSubmit={handleSubmit(search)}>
                <input className={style.searchInput}
                    placeholder="Søk etter pasient basert på navn, fødselsdato, eller personnummer"
                    {...register("searchKeyword")}
                    id="searchKeyword" />
                <Search className={style.searchIcon} onClick={handleSubmit(search)} />
            </form>
        </div>
        <div className={style.resultsWrapper}>
            {searchValue ? <PatientResults searchValue={searchValue} /> : null}
        </div>
    </div>
}
