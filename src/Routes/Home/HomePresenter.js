
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Section from "../../Components/Section"
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster"

const Container = styled.div`
    padding:20px; 
`;

const HomePresenter = ({nowPlaying,upcoming,popular,error,loading})=>
loading?(<Loader/>
):(<Container>
        {upcoming&& upcoming.length>0&&(
            <Section title="Upcoming">
            {upcoming.map(movie=>
         <Poster
         id={movie.id}
        key={movie.id}
        title={movie.original_title}
        imageUrl={movie.poster_path}
        rating={movie.vote_average}
        isMovie={true}
        year={movie.release_date.substring(0,4)}/>
            )}</Section>
        )}
        {nowPlaying && nowPlaying.length>0 && (
            <Section title="Now Playing">
            {nowPlaying.map(movie=>
                <Poster
        key={movie.id}
        title={movie.original_title}
        imageUrl={movie.poster_path}
        rating={movie.vote_average}
        isMovie={true}
        year={movie.release_date.substring(0,4)}/>
            )}</Section>
            )}
        {popular&& popular.length>0&&(
            <Section title="Popular">
            {popular.map(movie=>
                <Poster
        key={movie.id}
        title={movie.original_title}
        imageUrl={movie.poster_path}
        rating={movie.vote_average}
        isMovie={true}
        year={movie.release_date.substring(0,4)}/>
            )}</Section>
        )}
            {error && <Message text={error} color="#e74c3c"/>}
   </Container>
);


HomePresenter.propTypes={
    nowPlaying:PropTypes.array,
    popular:PropTypes.array,
    upcoming:PropTypes.bool.isRequired,
    error:PropTypes.string,
    loading:PropTypes.bool.isRequired,
}

export default HomePresenter;