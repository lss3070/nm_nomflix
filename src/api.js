import axios from "axios";

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params:{
        api_key:"fb2a40b3535e913321084bcbcc0e1364",
        language:"en-US"
    }
});



export const MovieApi={
    nowPlaying:()=>api.get("movie/now_playing"),
    upcoming:()=>api.get("movie/upcoming"),
    popular:()=>api.get("movie/popular"),
    movieDetail:(id)=>api.get(`movie/${id}`,{
        params:{
            append_to_response:"videos"
        }
    }),
    search:(term)=>api.get("search/movie",{
        params:{
            query:encodeURIComponent(term) 
        }
    }),
    collections:(id)=>api.get(`collection/${id}`)
}

export const TVApi= {
    topRated:()=>api.get("tv/top_rated"),
    popular:()=>api.get("tv/popular"),
    airingToday:()=>api.get("tv/airing_today"),
    showDetail:(id)=>api.get(`tv/${id}`,{
        params:{
            append_to_response:"videos"
        }
    }),
    search:(term)=>api.get("search/tv",{
        params:{
            query:encodeURIComponent(term) 
        }
    }),
    season:(id,num)=>api.get(`tv/${id}/season/${num}`)
}



export default api;