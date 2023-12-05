import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getTMDBGenres, getTopRatedMovies, getNowPlayingMovies, getMovieDetails, searchMovies } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getTMDBGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/top-rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/now-playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieDetails = await getMovieDetails(movieId);
    res.status(200).json(movieDetails);
}));


router.get('/search', asyncHandler(async (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({ message: 'Search query is required.', status_code: 400 });
    }

    // Perform the movie search based on the query
    const searchResults = await movieModel.searchMovies(query);

    res.status(200).json(searchResults);
}));

export default router;
