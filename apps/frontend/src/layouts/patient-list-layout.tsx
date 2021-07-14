import React from 'react';
import Searchbar from '../components/patientSearch/searchbar';
import { SearchResults } from '../components/patientSearch/searchResults';

const SearchLayout = () => {
    return (
        <>
            <Searchbar />
            <SearchResults />
        </>
    );
}

export default SearchLayout;