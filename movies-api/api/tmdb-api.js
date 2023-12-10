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

/////////////////////////////////////////////////////

export const getPopularTVShows = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular TV shows.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

// tmdb-api/index.js
export const getSeriesDetails = async (seriesId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch TV series details.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};



export const getTopRatedMovies = async ( ) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );
  
        if (!response.ok) {
            throw new Error("Failed to fetch top rated movies.");
        }
  
        return response.json();
    } catch (error) {
        throw error;
    }
  };


export const getNowPlayingMovies = async () => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
          throw new Error("Failed to fetch now playing movies.");
      }

      return response.json();
  } catch (error) {
      throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
      }

      return response.json();
  } catch (error) {
      throw error;
  }
};

export const searchMovies = async (query) => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=1`
      );

      if (!response.ok) {
          throw new Error("Failed to fetch search results.");
      }

      return response.json();
  } catch (error) {
      throw error;
  }
};

  ////////////////////////////////////////////////////////////////////////////

export const getPopularPeople = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular people.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getPersonDetails = async (personId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch person details.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const getPersonMovieCredits = async (personId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch person movie credits.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};



