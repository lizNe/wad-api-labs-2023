export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

  export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

////////////////////////////////////////////

export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/now-playing');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/top-rated');
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/${movieId}`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/search-movies?query=${query}`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////

export const getPopularPeople = async (page = 1) => {
  try {
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/popular`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
      },
    });
    return response.json();
  } catch (error) {             
    throw error;
  }
};

export const getPersonDetails = async (personId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/actor/${personId}`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getPersonMovieCredits = async (personId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/${personId}/movie-credits`);
    return response.json();
  } catch (error) {
    throw error;
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////


export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/series/tmdb/popular`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch popular TV shows.");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const getSeriesDetails = async (seriesId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/series/tmdb/serie/${seriesId}`);
    return response.json();
  } catch (error) {
    throw error;
  }
};
