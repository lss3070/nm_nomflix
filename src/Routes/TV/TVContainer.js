import React from "react";
import TVPresenter from "./TVPresenter";
import {TVApi as tvApi} from "../../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    state={
        topRated:null,
        popular:null,
        airingTday:null,
        error:null,
        loading:true
    }
    

    async componentDidMount(){
        try{
            const {data: {results : topRated}
        }= await tvApi.topRated();
            const {data: {results : popular}
        } = await tvApi.popular();
            const {data: {results : airingTday}
        } = await tvApi.airingToday();

        console.log(await tvApi.topRated());
           this.setState({
            topRated:topRated,
            popular:popular,
            airingTday:airingTday
        })
        }catch(e){
            this.setState({
                error:"Cant't find TV information."
            })
        }finally{
            this.setState({loading:false});
        }
    }


    render() {
        const {topRated,popular,airingTday,loading,error}= this.state;
        console.log(this.state);
        return (
            <TVPresenter
                topRated={topRated}
                popular={popular}
                airingTday={airingTday}
                error={error}
                loading={loading}
            />
        );
    }
}

