import express from 'express';
const router = express.Router();

import { AddMovie, DeleteMovie, DisplayMovieById, DisplayMovieList, UpdateMovie } from '../Controllers/movie';


/* List of routes (endpoints) */

/* GET Movie List. */
router.get('/', (req, res, next) => {
  // Display some data
  DisplayMovieList(req,res,next);
});

/* GET Movie through Id. */
router.get('/:id', (req, res, next) => {
  // Display some data
  DisplayMovieById(req,res,next);
});

/* Create Movie. */
router.post('/add', (req, res, next) => {
  // Display some data
  AddMovie(req,res,next);
});

/* Update Movie through Id. */
router.put('/update/:id', (req, res, next) => {
  // Display some data
  UpdateMovie(req,res,next);
});

/* Delete Movie through Id. */
router.delete('/delete/:id', (req, res, next) => {
  // Display some data
  DeleteMovie(req,res,next);
});

export default router;
