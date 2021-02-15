
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section"
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster"

const Container = styled.div`
    padding:20px; 
`;

const CollectionsPresenter = ({collections,error,loading})=>(
    <>
        <Helmet>
    <title>Collections | Subflex</title>
    </Helmet>
        {loading?<Loader/>
        :
<Container>

        {collections&&collections.parts&& collections.parts.length>0&&(
            <Section title="Collections">
            {collections.parts.map(movie=>
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
            {error && <Message text={error} color="#e74c3c"/>}
   </Container>}
    </>
);

CollectionsPresenter.propTypes={
    collections:PropTypes.bool.isRequired,
    error:PropTypes.string,
    loading:PropTypes.bool.isRequired,
}

export default CollectionsPresenter;