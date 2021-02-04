
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section"
import Message from "../../Components/Message"
import Poster from "../../Components/Poster"

const Container=styled.div`
padding:0px 20px`;

const TVPresenter = ({topRated,popular,airingTday,loading,error})=>loading?null:
<Container>
    {topRated&& topRated.length>0&&
    <Section title="Top Rated Shows">
        {topRated.map(show=>
         <Poster
         id={show.id}
        key={show.id}
        title={show.original_name}
        imageUrl={show.poster_path}
        rating={show.vote_average}
        isMovie={true}
        year={show.first_air_date.substring(0,4)}/>
            )}
        </Section>}
    {popular&& popular.length>0&&
    <Section title="Popular Shows">
        {popular.map(show=>
         <Poster
         id={show.id}
        key={show.id}
        title={show.original_name}
        imageUrl={show.poster_path}
        rating={show.vote_average}
        isMovie={true}
        year={show.first_air_date.substring(0,4)}/>
        )}
        </Section>}
    {airingTday&& airingTday.length>0&&
    <Section title="Airing Today">
        {airingTday.map(show=>
         <Poster
         id={show.id}
        key={show.id}
        title={show.original_name}
        imageUrl={show.poster_path}
        rating={show.vote_average}
        isMovie={true}
        year={show.first_air_date.substring(0,4)}/>
        )}
        </Section>}
        {error && <Message text={error} color="#e74c3c"/>}
        
</Container>;

TVPresenter.propTypes={
    topRated:PropTypes.array,
    popular:PropTypes.array,
    airingTday:PropTypes.array,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
}

export default TVPresenter;