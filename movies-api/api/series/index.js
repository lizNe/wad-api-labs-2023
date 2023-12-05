// tvSeries/index.js
import tvSeriesModel from './tvSeriesModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getPopularTVShows } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  [page, limit] = [+page, +limit];

  const [total_results, results] = await Promise.all([
    tvSeriesModel.estimatedDocumentCount(),
    tvSeriesModel.find().limit(limit).skip((page - 1) * limit)
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
  const tvSeries = await tvSeriesModel.findByTVSeriesDBId(id);
  if (tvSeries) {
    res.status(200).json(tvSeries);
  } else {
    res.status(404).json({ message: 'The TV series you requested could not be found.', status_code: 404 });
  }
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
  let { page = 1 } = req.query;
  page = +page;

  try {
    const popularTVShows = await getPopularTVShows(page);
    res.status(200).json(popularTVShows);
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

export default router;
