import React from 'react';
import { useQuery } from 'react-query';
import { getMovies } from "./api/movies-api";
import { getPopularTVShows } from './api/movies-api';

export const PublicPage = () => {
    return <h2>Public page</h2>
 }
 export const Movies = () => {
    const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
    if (isLoading) {
        return <h1>Loading...</h1>
      }
    
      if (isError) {
        return <h1>{error.message}</h1>
      }  
      const movies = data.results;
      const moviesDisplay = (
        <div>
            {movies.map(movie => { return <>{movie.id},{movie.title}<br /></> })}
        </div>
    )
       return <div><h2>Movies</h2>{moviesDisplay}</div>
              
 }

 const SeriesPage = () => {
  const { data, error, isLoading, isError } = useQuery('popularTVShows', getPopularTVShows);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const series = data.results;
  const seriesDisplay = (
    <div>
      {series.map(serie => (
        <li key={serie.id}>
          {serie.id}, {serie.name}<br />
        </li>
      ))}
    </div>
  );

  return (
    <div>
      <h2>TV Series</h2>
      {seriesDisplay}
    </div>
  );
};




















 export const Profile = () => {
    return <h2>My Profile </h2>

}
 export const HomePage = () => {
     return  <h2>Home page</h2>
 }
 