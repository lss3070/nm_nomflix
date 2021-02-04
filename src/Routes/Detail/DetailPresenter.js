
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Poster";

const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    position:relative;
    padding:50px;
`;


const Backdrop=styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url(${props=>props.bgImage});
    background-position:center center;
    background-size:cover;
    filter:blur(3px);
    opacity:0.5;
    z-index:0;
`;

const Content =styled.div`
    display:flex;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`

const Cover =styled.div`
    width:30%;
    background-image:url(${props=>props.bgImage});
    background-position:center center;
    background-size:cover;
    height:100%;
    border-radius:5px;
`

const Data =styled.div`
    width:70%;
    margin-left:10px;
`

const Title=styled.span`

`
const Item =styled.span`

`

const Divider=styled.span`

`

const Overview = styled.p`

`

const DetailPresenter = ({result,loading,error})=>(
    loading? <Loader/>:
    <Container>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Content>

    
    <Cover bgImage={result.poster_path? `https://image.tmdb.org/t/p/original${result.poster_path}`:require("../../assects/noimage.jpeg")}/>
   
   <Data>
    <Title>{result.original_title?result.original_title:result.original_name}</Title>
       <Item></Item>
   </Data>
    </Content>
    </Container>

);

DetailPresenter.propTypes={
   result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
}

export default DetailPresenter;