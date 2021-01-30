import React from "react";
import SearchPresenter from "./SearchPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    state={
        movieResults:null,
        tvResults:null,
        searchTerm:"",
        loading:false,
        error:null
    }
    
    render() {
        const {movieResults,tvResults,searchTerm,loading,error}= this.state;
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
            />
        );
    }
}
