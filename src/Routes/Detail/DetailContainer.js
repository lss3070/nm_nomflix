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
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        }
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
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }

        let result=null;
        let season=null;
        try{
            if(isMovie)
                //const ={}와 같음
                //let request = await MovieApi.movieDetail(parsedId))
                //result = request.data와 같음
                ({data:result}=await MovieApi.movieDetail(parsedId));
            else{
                ({data:season}= await TVApi.season(parsedId,1));
                ({data:result}= await TVApi.showDetail(parsedId));
                result.episodes=[...season.episodes];
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
            <TVDetailPresenter result={result}  error={error} loading={loading}/>
           
        );
    }
}
