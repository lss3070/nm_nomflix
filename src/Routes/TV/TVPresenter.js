
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section"
import Message from "../../Components/Message"

const Container=styled.div`
padding:0px 20px`;

const TVPresenter = ({topRated,popular,airingTday,loading,error})=>loading?null:
<Container>
    {topRated&& topRated.length>0&&
    <Section title="Top Rated Shows">
        {topRated.map(show=>show.name)}</Section>}
    {popular&& popular.length>0&&
    <Section title="Popular Shows">
        {popular.map(show=>show.name)}</Section>}
    {airingTday&& airingTday.length>0&&
    <Section title="Airing Today">
        {airingTday.map(show=>show.name)}</Section>}
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