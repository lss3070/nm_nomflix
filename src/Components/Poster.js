import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";

// const baseUrl=""


const Container = styled.div`
font-size:12px
`

const Image=styled.div`
    background-image:url(${props=>props.bgUrl});
    height:180px;
    background-size:cover;
    border-radius:4px;
    background-position:center center;
    transition:opacity 0.1s linear;
`;

const Rating= styled.span`
    bottom:5px;
    right:5px;
    position:absolute;
    opacity:0;

`;

const Title = styled.span`
    display:block;
    font-size:12px;
    margin-bottom:3px;

`;
const ImageContainer= styled.div`
    position:relative;
    &:hover{
        ${Image}{
            opacity:0.3;
        }
        ${Rating}{
            opacity:1;
        }
    }
    margin-bottom:5px;
`;

const Year = styled.span`
font-size:10px;
color:rgba(255,255,255,0.5)
`;


const Poster=({id,imageUrl,title,rating,year,isMovie=false})=>
<Link to={isMovie?`/movie/${id}`:`/show/${id}`}>
<Container>
    <ImageContainer>
        <Image bgUrl={imageUrl? `https://image.tmdb.org/t/p/w300${imageUrl}`
        :require("../assects/noimage.jpeg").default }> </Image>
        <Rating>
            <span role="img" aria-label="rating">✨</span>{" "}
            {rating}/10
            </Rating>
    </ImageContainer>
<Title>{title&&title.length>15 ? `${title.substring(0,18)}...`:title}</Title>
<Year>{year}</Year>
</Container>

</Link>

Poster.propTypes={
    id:PropTypes.number.isRequired,
    imageUrl:PropTypes.string,
    title:PropTypes.string.isRequired,
    rating:PropTypes.number,
    year:PropTypes.string
}

export default Poster;