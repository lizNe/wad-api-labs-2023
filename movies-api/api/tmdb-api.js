import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTMDBGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(response.json().message);
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

// tmdb-api.js

export const getPopularTVShows = async (page = 1) => {
  if (page < 1 || page > 1000) {
    throw new Error("Invalid page number. Page must be between 1 and 1000.");
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular TV shows.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

  