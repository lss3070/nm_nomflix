import React from "react";
import {MovieApi, TVApi} from "../../api";
import DetailPresenter from "./DetailPresenter";

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
        const {isMovie} = this.state
        console.log(`!!! ${isMovie}`);
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }

        let result=null;
        try{
            if(isMovie)
                //const ={}와 같음
                //let request = await MovieApi.movieDetail(parsedId))
                //result = request.data와 같음
                ({data:result}=await MovieApi.movieDetail(parsedId));
            else
               ({data:result}= await TVApi.showDetail(parsedId));
        }catch(e){
            this.setState({error:"Cant't find anything."})
        }finally{
            this.setState({loading:false,result});
        }
    }

    render() {
        const {result, error, loading} = this.state;
        console.log(result);
        return (
            <DetailPresenter result={result} error={error} loading={loading}/>
        );
    }
}
