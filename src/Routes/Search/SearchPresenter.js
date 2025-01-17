
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import Section from "../../Components/Section"
import Message from "../../Components/Message"

import Poster from "../../Components/Poster"
import Helmet from "react-helmet";


const Container= styled.div`
    padding:0px 20px;
`;

const Form = styled.form`
    margin-bottom:20px;
    width:100%;
`;

const Input = styled.input `
    all:unset;
    font-size:28px;
    width:100%;

`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    loading,
    error,
    searchTerm,
    handleSubmit,
    updateTerm
    }) => (
<Container>
<Helmet>
    <title>Search | Subflex</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
        <Input placeholder="Search Movies or Tv Shows..." value={searchTerm} onChange={updateTerm}/>
    </Form>
    {loading ?( <Loader/>) :(
    <>
        {movieResults && movieResults.length >0 && (
            <Section title="Movie Results">
            {movieResults.map(movie=>(
                  <Poster
                  id={movie.id}
                 key={movie.id}
                 title={movie.original_title}
                 imageUrl={movie.poster_path}
                 rating={movie.vote_average}
                 isMovie={true}
                 year={movie.release_date.substring(0,4)}/>
            ))}
        </Section>
        )}
        {tvResults && tvResults.length >0 && (
        <Section title="Movie Results">
            {tvResults.map(tv=>(
                   <Poster
                   id={tv.id}
                  key={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date&&tv.first_air_date.substring(0,4)}/>
            ))}
        </Section>
        )}
        {error && <Message text={error} color="#e74c3c"/>}
        
         {tvResults && 
         movieResults && 
         tvResults.length ===0 && 
         movieResults.length === 0&&
         (<Message text="Noting for" color="#95a5a6"/>
         )}
        </>
    )}
      
        
</Container>
);

SearchPresenter.propTypes={
    movieResults:PropTypes.array,
    tvResults:PropTypes.array,
    error:PropTypes.string,
    searchTerm:PropTypes.string,
    loading:PropTypes.bool.isRequired,
    handleSubmit:PropTypes.func.isRequired,
    updateTerm:PropTypes.func.isRequired
};

export default SearchPresenter;