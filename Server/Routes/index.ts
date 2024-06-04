import express from 'express';
const router = express.Router();

import { DisplayMovieList } from '../Controllers/movie';


/* List of routes (endpoints) */

/* GET Movie List. */
router.get('/', function(req, res, next) {
  // Display some data
  DisplayMovieList(req,res,next);
});

export default router;
