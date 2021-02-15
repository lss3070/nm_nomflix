import React from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import {MovieApi as moviesApi} from "../../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    constructor(props) {
        super(props); //생성자 클래스
        const {location: {
                pathname
            }} = props;
        }
    state={
        collections:null,
        error:null,
        loading:true
    };

   async componentDidMount(){
    const {
        match: {
            params: {
                id
            }
        },
        history: {
            push
        },
    } = this.props;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        return push("/");
    }
        try{
            const {data} = await moviesApi.collections(parsedId);
            this.setState({
                collections:data
            })
            
        }catch(e){
            this.setState({
                error:"Can't get Collections"
            })
        }finally{
            this.setState({
                loading:false
            })
        }
    }
    render() {
        const {collections,error,loading}= this.state;
        return (
            <CollectionsPresenter
            collections={collections}
                error={error}
                loading={loading}
            />
        );
    }
}

