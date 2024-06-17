import express from 'express';
const router = express.Router();

import { AddMovie, DeleteMovie, DisplayMovieById, DisplayMovieList, UpdateMovie } from '../Controllers/movie';
import { ProcessLogin, ProcessLogout, ProcessRegistration } from '../Controllers/auth';

/* List of Authentication (endpoints) */

/* Register User. */
router.post('/register', (req, res, next) => {
  // Display some data
  ProcessRegistration(req,res,next);
});

/* Login User. */
router.post('/login', (req, res, next) => {
  // Display some data
  ProcessLogin(req,res,next);
});

/* Logut User. */
router.get('/logout', (req, res, next) => {
  // Display some data
  ProcessLogout(req,res,next);
});

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


/* List of Authentication (endpoints) */

/* Register User. */
router.post('/register', (req, res, next) => {
  // Display some data
  ProcessRegistration(req,res,next);
});

/* Login User. */
router.post('/login', (req, res, next) => {
  // Display some data
  ProcessLogin(req,res,next);
});

/* Logut User. */
router.get('/logout', (req, res, next) => {
  // Display some data
  ProcessLogout(req,res,next);
});

export default router;
