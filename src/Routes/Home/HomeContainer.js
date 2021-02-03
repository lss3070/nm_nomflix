import React from "react";
import HomePresenter from "./HomePresenter";
import {MovieApi as moviesApi} from "../../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    state={
        nowPlaying:null,
        upcoming:null,
        popular:null,
        error:null,
        loading:true
    };

   async componentDidMount(){
        try{
            const {data:{results:nowPlaying}// :~ 변수명 변경
        } = await moviesApi.nowPlaying();
            const {data:{results:upcoming}// :~ 변수명 변경
        } = await moviesApi.upcoming();
            const {data:{results:popular}// :~ 변수명 변경
        } = await moviesApi.popular();


            this.setState({
                nowPlaying:nowPlaying,
                upcoming:upcoming,
                popular:popular
            })
            
        }catch(e){
            this.setState({
                error:"Can't get Movie"
            })
        }finally{
            this.setState({
                loading:false
            })
        }
    }


    
    render() {
        const {nowPlaying,upcoming,popular,error,loading}= this.state;
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}

