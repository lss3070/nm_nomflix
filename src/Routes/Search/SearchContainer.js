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
    };

    
    handleSubmit=(e)=>{
        e.preventDefault();
        const {searchTerm} = this.state;
        if(searchTerm !==""){
            this.searchByTerm();
        }
    }
    updateTerm=(e)=>{
        e.preventDefault();
       const {target:{value}}=e;
       this.setState({
           searchTerm:value
       })
    }

    searchByTerm= async()=>{
        const {searchTerm} = this.state;
        this.setState({loading:true});
        try{
            const{
                data:{results: movieResults }
            }=await MovieApi.search(searchTerm);
            const {
                data:{results: tvResults }
            }=await TVApi.search(searchTerm);
                
            this.setState({
                tvResults,
                movieResults,
            });
        }catch(e){
            this.setState({error:"can't find results"});
        }finally{
            console.log(this.state);
            this.setState({loading:false});
        }
    }
    
    render() {
        const {movieResults,tvResults,searchTerm,loading,error}= this.state;
        console.log(tvResults)
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}

