import React from "react";
import {MovieApi, TVApi} from "../../api";
import MovieDetailPresenter from "./MovieDetailPresenter";
import TVDetailPresenter from "./TVDetailPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
    constructor(props) {
        super(props); //생성자 클래스
        const {location: {
                pathname
            }} = props;
        this.state = {
            parsedId:null,
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        }
    }
     chageSeason=async (num)=>{
       const {data} = await TVApi.season(this.state.parsedId,parseInt(num));
       let result = this.state.result;
       result.episodes=data.episodes;
       result.episode_detail=data.episodes[0];
       this.setState({result})
    }

    changeOverview=async (episode)=>{
        let result = this.state.result;
       result.episode_detail=episode;
       this.setState({result})
    }

    async componentDidMount() {
        const {
            match: {
                params: {
                    id
                }
            },
            history: {
                push
            },
            location: {
                pathname
            }
        } = this.props;
        const {isMovie} = this.state;

        const parseId = parseInt(id);
        this.setState({parsedId:id});

  
        if (isNaN(parseId)) {
            return push("/");
        }
       
        let result=null;
        let season=null;
   
        try{
            if(isMovie)
                //const ={}와 같음
                //let request = await MovieApi.movieDetail(parsedId))
                //result = request.data와 같음
                ({data:result}=await MovieApi.movieDetail(parseId));
            else{
                ({data:season}= await TVApi.season(parseId,1));
                ({data:result}= await TVApi.showDetail(parseId));
                result.episodes=[...season.episodes];
                result.episode_detail=result.episodes[0];
            }
        }catch(e){
            this.setState({error:"Cant't find anything."})
        }finally{
            this.setState({loading:false,result});
        }
    }

    render() {
        const {result, error, loading,isMovie} = this.state;
        console.log(result);
        return (
            isMovie? <MovieDetailPresenter result={result} error={error} loading={loading}/>:
            <TVDetailPresenter result={result}  error={error} loading={loading} chageSeason={this.chageSeason}changeOverview={this.changeOverview}/>
           
        );
    }
}
