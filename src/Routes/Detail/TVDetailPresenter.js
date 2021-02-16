
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
const TopContent=styled.div`
width:100%;
display:inline-block;`

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
    float:left;
    width:70%;
    min-height:250px;
    padding:20px;
    margin-left:10px;
`
const ProductionData=styled.div`
float:left;
width:29%;
min-height:250px;
`

const Title=styled.h3`
float:left;
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
const ShowSeasion=styled(Link)`
border-radius:5px;
background-color:rgba(255,255,255,0.4);
padding:5px;
float:right;
border:1px solid #bdbdbd;
&:hover{
    background-color:rgba(255,255,255,0.6);
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
background-color:rgba(0, 0, 0, 0.6);
padding-top:10px;
width:100%;
height:100%;
display:inline-block;
`

const Seasons = styled.div`
display:block;
float:left;
width:150px;
`
const SeasonItem = styled.div` 
width:100%;
font-size:15px;
height:30px;
cursor: pointer;
padding:10px 10px 10px 0;
border-left:4px solid transparent;
&:nth-child(2n){
    background: linear-gradient( to right, rgba(100,100,100,0.3), rgba(0,0,0,0) );
}
&:hover{
    border-left:4px solid rgba(102,102,102);
};
`

const Episodes = styled.div`
float:left;`;

const EpisodeItem =styled.div` 
font-size:14px;
height:30px;
width:500px;
cursor: pointer;
border-left:4px solid transparent;
padding:5px;
&:nth-child(2n){
    background: linear-gradient( to right, rgba(100,100,100,0.3), rgba(0,0,0,0) );
}
&:hover{
    border-left:4px solid rgba(102,102,102);
}
`
const EpisodeOverview = styled.div`

`;
const EpisodeOverviewTitle=styled.h1`font-size:30px;
font-weight:bold;
margin-bottom:20px;
`
const EpisodeOverviewContent=styled.div`
color:rgba(115,115,115);
margin-bottom:20px;`



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


const MovieDetailPresenter = ({result,loading,error,chageSeason,changeOverview})=>(
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
            <TopContent>
            <Data>
            <Cover bgImage={result.poster_path? `https://image.tmdb.org/t/p/original${result.poster_path}`:require("../../assects/noimage.jpeg")}/>

            <Title>{result.original_title?result.original_title:result.original_name}</Title>
            <IMDCIcon bgUrl={require("../../assects/imdb.png").default}
                href={result.imdb_id?`https://www.imdb.com/title/${result.imdb_id}`:""}
                target="_blank"> </IMDCIcon>
            <ItemContainer>
                <Item>{
                result.release_date?
                result.release_date.substring(0,4)
                :result.first_air_date.substring(0,4)}
                </Item>
                {result.release_date?<Divider>·</Divider>:""}
                {result.first_air_date?<Divider>·</Divider>:""}
                <Item>{
                result.runtime
                ? result.runtime
                : result.episode_run_ime}
                </Item>
                {result.runtime?<Divider>·</Divider>:""}
                {result.episode_run_ime?<Divider>·</Divider>:""}

                <Item>{
                result.genres&& 
                result.genres.map((genre,i)=>
                i===result.genres.length-1? genre.name :`${genre.name} /`)
                }
                </Item>
                <Item>


{result.episodes&&result.episodes.length>0&&
    <ShowSeasion to={result.id&&`/seasions/tv/${result.id}/${result.number_of_seasons}`}
>Seasions</ShowSeasion>}

                
                </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
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

            </TopContent>

<Series>
    {result.seasons&&result.seasons.length>0&&
    <Seasons>
        {result.seasons.map((season,index)=>
            season.season_number>0&& 
            <SeasonItem key={season.season_number} 
            onClick={()=>chageSeason(season.season_number)}>{season.name}</SeasonItem>
        )
        }
    </Seasons>}
    {result.episodes&&result.episodes.length>0&&
    <Episodes>
        {result.episodes.map((episode,index)=>
            <EpisodeItem onClick={()=>{
                changeOverview(episode)
            }
            }>{index+1} {episode.name}</EpisodeItem>
        )}
    </Episodes>}
    {result.episode_detail&&
    <EpisodeOverview>
<EpisodeOverviewTitle> {result.episode_detail.name}</EpisodeOverviewTitle>
    <EpisodeOverviewContent>Epsode {result.episode_detail.episode_number}</EpisodeOverviewContent>
<EpisodeOverviewContent> {result.episode_detail.overview}</EpisodeOverviewContent>
        </EpisodeOverview>}
    
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
    error:PropTypes.string,
    chageSeason:PropTypes.func.isRequired,
    changeOverview:PropTypes.func.isRequired
}

export default MovieDetailPresenter;