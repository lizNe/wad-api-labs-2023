// tvSeries/index.js
import serieModel from './serieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getPopularTVShows } from '../tmdb-api';

const router = express.Router();

// Get all TV series
router.get('/', asyncHandler(async (req, res) => {
  const tvSeries = await serieModel.find();
  const total_results = tvSeries.length;

  const returnObject = {
    total_results,
    tvSeries
  };

  res.status(200).json(returnObject);
}));

// Get TV series details by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const tvSeries = await serieModel.findByTVSeriesDBId(id);
  if (tvSeries) {
    res.status(200).json(tvSeries);
  } else {
    res.status(404).json({ message: 'The TV series you requested could not be found.', status_code: 404 });
  }
}));

// Get popular TV series from TMDB
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
  try {
    const popularTVShows = await getPopularTVShows();
    res.status(200).json(popularTVShows);
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

export default router;
