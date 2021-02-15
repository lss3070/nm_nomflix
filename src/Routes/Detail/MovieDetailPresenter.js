
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Poster";
import Helmet from "react-helmet";
import {Link} from "react-router-dom" //withRouter를 이용하여 컴포넌트 연결

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
    width:50%;
    margin-left:10px;
`
const ProductionData=styled.div`
width:20%;
`

const Title=styled.h3`
font-size:32px;
margin-bottom:20px;

`
const Item =styled.span`

`
const ItemContainer =styled.div`
    margin:20px 0;
`

const Divider=styled.span`
    margin:0 10px;
`

const Overview = styled.p`

    font-size:12px;
    opacity:0.7;
    line-height:1.5;
    width:50%;

`

const IMDCIcon=styled.a`

    background:url(${props=>props.bgUrl});
    height:30px;
    width:50px;
    background-size:cover;
    border-radius:4px;
    background-position:center center;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    &:hover{
        cursor:pointer;
    }
`
const VideoArea =styled.div`
position:fixed;
border-top:1px solid #bdbdbd;
bottom:0;
width:100%;
padding:10px;
`;
const Video =styled.iframe`
width:100px;
height:100px;
display:inline-block;
margin-right:20px;

`
const ProductionArea=styled.div`
margin-top:20px;
width:auto;

`
const ProductionTitle =styled.h1`
margin-bottom:20px;
`
const Productions= styled.a`
    background:url(${props=>props.bgUrl});
    background-size:cover;
    background-position:center center;
    background-repeat:no-repeat;
    display:inline-block;
    width:50px;
    height:50px;   
`
const Languages = styled.a`
color:white;
`
const Collections= styled(Link)`

background:url(${props=>props.bgImage});
    background-size:cover;
    background-position:center center;
    background-repeat:no-repeat;
    display:inline-block;
    width:50px;
    height:50px;   
    &:hover{
        cursor: pointer;
    }
`

const MovieDetailPresenter = ({result,loading,error})=>(
    loading?
    <> 
    <Helmet>
        <title>Loading | Subflix</title>
    </Helmet>
    <Loader/>
    </>:
    <Container>
            <Helmet>
    <title>{result.original_title?result.original_title:result.original_name} | Subflex</title>
    </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Content>

    <Cover bgImage={result.poster_path? `https://image.tmdb.org/t/p/original${result.poster_path}`:require("../../assects/noimage.jpeg")}/>
   <Data>
    <Title>{result.original_title?result.original_title:result.original_name}</Title>
    <ItemContainer>
        <Item>{
        result.release_date?
        result.release_date.substring(0,4)
        :result.first_air_date.substring(0,4)}
        </Item>
        <Divider>·</Divider>
        <Item>{
        result.runtime
        ? result.runtime
        : result.episode_run_ime}
        </Item>
        <Divider>·</Divider>
        <Item>{
        result.genres&& 
        result.genres.map((genre,i)=>
        i===result.genres.length-1? genre.name :`${genre.name} /`)
        }
        </Item>
        <Item>
        <IMDCIcon bgUrl={require("../../assects/imdb.png").default}
        href={result.imdb_id?`https://www.imdb.com/title/${result.imdb_id}`:""}
        target="_blank"> </IMDCIcon>
        
        </Item>
    </ItemContainer>
    <Overview>{result.overview}</Overview>
{result.belongs_to_collection&&
<Collections to={result.belongs_to_collection.id&&`/collections/${result.belongs_to_collection.id}`}
bgImage={result.belongs_to_collection.poster_path?
`https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`:""}

></Collections>}
   
{result.videos.results&&result.videos.results.length>0&&
            <VideoArea>
               {result.videos.results.map((video)=>
                   <Video key={video.id} src={`https://www.youtube.com/embed/${video.key}?controls=0`}></Video>
               )}     
           </VideoArea>}
   </Data>
    
    <ProductionData>
    {result.production_companies&&result.production_companies.length>0&&
        <ProductionArea>
            <ProductionTitle>ProductionCompanies</ProductionTitle>

            {result.production_companies.map((company)=>
            company.logo_path&&
             <Productions key={company.id} bgUrl={`https://image.tmdb.org/t/p/original/${company.logo_path}`}></Productions>
            )}
        </ProductionArea>
        }
    {result.production_countries&&result.production_countries.length>0&&
          <ProductionArea>
          <ProductionTitle>ProductionCuntries</ProductionTitle>

          {result.production_countries.map((company)=>
          company.iso_3166_1&&
           <Productions key={company.iso_3166_1} bgUrl={`https://www.countryflags.io/${company.iso_3166_1}/shiny/64.png`}></Productions>
          )}
      </ProductionArea>
    }

{result.spoken_languages&&result.spoken_languages.length>0&&
          <ProductionArea>
          <ProductionTitle>Spokee Languages</ProductionTitle>

          {result.spoken_languages.map((language)=>
          language.english_name&&
          <Productions key={language.name} >{language.english_name}</Productions>
          )}
      </ProductionArea>
    }
    </ProductionData>
    </Content>

    </Container>

);

MovieDetailPresenter.propTypes={
   result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
}

export default MovieDetailPresenter;