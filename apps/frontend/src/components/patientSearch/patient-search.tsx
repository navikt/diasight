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

    return <div className={style.wrapper}>
        <div className={style.searchWrapper}>
            <form className={style.searchForm} autoComplete="off" onSubmit={handleSubmit(search)}>
                <input className={style.searchInput}
                    placeholder="Søk etter pasient basert på personnumer eller navn"
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
