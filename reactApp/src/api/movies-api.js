export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=285eb1b0be19f5fbb9e0ac3de08089ae&language=en-US&include_adult=false&page=1`
    )
    
    return response.json()
  };