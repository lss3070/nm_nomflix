import React from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import {MovieApi as moviesApi, TVApi} from "../../api";

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
        seasions:[],
        error:null,
        loading:true,
        isMove:true
    };

   async componentDidMount(){
    const {
        match: {
            params: {
                type,
                id,
                maxseasion
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
            if(!type){
                const {data} = await moviesApi.collections(parsedId);
                this.setState({
                    collections:data
                })
            }else{
                let seasions=[];
                for(let i=1;i<=maxseasion;i++){
                    let {data}=await TVApi.season(parsedId,i)
                    data.origin_id=parsedId;
                    seasions.push(data);
                    
                }
                this.setState({
                    seasions:seasions
                })
            }
          
   
            
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
        const {collections,seasions,error,loading}= this.state;
        return (
            <CollectionsPresenter
            collections={collections}
            seasions={seasions}
                error={error}
                loading={loading}
            />
        );
    }
}

