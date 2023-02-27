import React from 'react';
import {MainLayout} from "../components/MainLayout";
import SearchResult from "../components/searchResult/searchResult";


const SearchResultMain = () => {
    return (
        <MainLayout title={"Результаты поиска"}>
          <SearchResult/>
        </MainLayout>
    );
};
export default SearchResultMain;
