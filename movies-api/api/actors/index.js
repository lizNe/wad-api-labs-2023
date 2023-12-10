import actorModel from './actorModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getPopularPeople, getPersonDetails, getPersonMovieCredits } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  [page, limit] = [+page, +limit];

  const [total_results, results] = await Promise.all([
    actorModel.estimatedDocumentCount(),
    actorModel.find().limit(limit).skip((page - 1) * limit),
  ]);
  const total_pages = Math.ceil(total_results / limit);

  const returnObject = {
    page,
    total_pages,
    total_results,
    results,
  };
  res.status(200).json(returnObject);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const actor = await actorModel.findByActorDBId({ id });
  if (actor) {
    res.status(200).json(actor);
  } else {
    res.status(404).json({ message: 'The actor you requested could not be found.', status_code: 404 });
  }
}));


router.get('/tmdb/popular', asyncHandler(async (req, res) => {
  const actorsPopular = await getPopularPeople();
  res.status(200).json(actorsPopular);
}));

router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
  const actorId = parseInt(req.params.id);
  const actorDetails = await getPersonDetails(actorId);
  res.status(200).json(actorDetails);
}));

router.get('/tmdb/:id/movie-credits', asyncHandler(async (req, res) => {
  const personId = req.params.id;
  const movieCredits = await getPersonMovieCredits(personId);
  res.status(200).json(movieCredits);
}));

export default router;
