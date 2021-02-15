
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
    display:block;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`


const Cover =styled.div`
    width:150px;
    background-image:url(${props=>props.bgImage});
    background-position:center center;
    background-size:cover;
    height:200px;
    border-radius:5px;
    float:left;
    margin-right:20px;
`

const Data =styled.div`
    width:100%;
    height:250px;
    padding:20px;
    margin-left:10px;

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
    width:100%;

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
const Series= styled.div`
border:1px solid red;
width:100%;
height:100%;
display:inline-block;
`

const Seasons = styled.div`
display:block;
float:left;
`
const SeasonItem = styled.div``

const Episodes = styled.div`
float:left;`;

const EpisodeItem =styled.div``;

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

            <Data>
            <Cover bgImage={result.poster_path? `https://image.tmdb.org/t/p/original${result.poster_path}`:require("../../assects/noimage.jpeg")}/>

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


            </Data>  
<Series>
    {result.seasons&&result.seasons.length>0&&
    <Seasons>
        {result.seasons.map((epsod,index)=>
            <SeasonItem>Season{index+1}</SeasonItem>
        )
        }
    </Seasons>}
    {result.episodes&&result.episodes.length>0&&
    <Episodes>
        {result.episodes.map((episode,index)=>
            <EpisodeItem>{index+1} {episode.name}</EpisodeItem>
        )}
    </Episodes>}
    
</Series>

   {result.videos.results&&result.videos.results.length>0&&
            <VideoArea>
               {result.videos.results.map((video)=>
                   <Video key={video.id} src={`https://www.youtube.com/embed/${video.key}?controls=0`}></Video>
               )}     
           </VideoArea>}
  
        </Content>

    </Container>

);

MovieDetailPresenter.propTypes={
   result:PropTypes.object,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.string
}

export default MovieDetailPresenter;