// tvSeries/index.js
import serieModel from './serieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getPopularTVShows, getSeriesDetails } from '../tmdb-api'; // Import getSeriesDetails from tmdb-api

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  [page, limit] = [+page, +limit];

  const [total_results, results] = await Promise.all([
    serieModel.estimatedDocumentCount(),
    serieModel.find().limit(limit).skip((page - 1) * limit)
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
  const tvSeries = await serieModel.findByTVSeriesDBId(id);
  if (tvSeries) {
    res.status(200).json(tvSeries);
  } else {
    res.status(404).json({ message: 'The TV series you requested could not be found.', status_code: 404 });
  }
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
  const popularSeries = await getPopularTVShows();
  res.status(200).json(popularSeries);
}));

// Directly call the TMDB API for series details
router.get('/tmdb/serie/:id', asyncHandler(async (req, res) => {
  const seriesId = parseInt(req.params.id);
  const serieDetails = await getSeriesDetails(seriesId);
  res.status(200).json(serieDetails);
}));

export default router;
