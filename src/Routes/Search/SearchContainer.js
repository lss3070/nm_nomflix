import React from "react";
import { MovieApi, TVApi } from "../../api";
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

    
    handleSubmit=()=>{
        const {searchTerm} = this.state;
        if(searchTerm !==""){
            this.searchByTerm();
        }
           
    }

    searchByTerm= async()=>{
        const {searchTerm} = this.state;
        this.setState({loading:true});
        try{
            let movie=await MovieApi.search(searchTerm)
            let tv=await TVApi.search(searchTerm)
           console.log(movie);
           console.log(tv);
            this.setState({
                movieResults:movie,
                tvResults:tv
            });

        }catch{
            this.setState({error:"can't find results"});
        }finally{
            this.state({loading:false});
        }
    }
    
    render() {
        const {movieResults,tvResults,searchTerm,loading,error}= this.state;
        console.log(this.state)
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

