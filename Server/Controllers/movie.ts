// TODO: Movie Controller Logic

import {Request, Response, NextFunction} from 'express';

import Movie from '../Models/movie';
import { SanitizeArray } from '../Util';

/**
 *
 *  This function displays the movie list in JSON format
 * 
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList (req: Request, res: Response, next: NextFunction): void {
    Movie.find({})
    .then((data) =>
    {
        res.status(200).json({success: true, msg: "Movie list retrived and displayed", data: data})
    })
    .catch((err) =>
    {
        console.error(err);
    })
}

/**
 * 
 * This function returns the details about a movie when the correct movieId is passed in the request parameters.
 * @param req 
 * @param res 
 * @param next 
 */
export function DisplayMovieById(req: Request, res: Response, next:NextFunction): void{
    // Get the Id from the endpoint
    let id = req.params.id;
    // Ensure that the Id is Valid
    if(id.length!= 24) {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a movie", data: ""});
    } else {
        Movie.findById({_id: id})
        .then((data) => {
            if(data){
                res.status(200).json({success: true, msg: "One Movie retrived and displayed", data: data})
            }
            if(!data) {
                res.status(404).json({success: false, msg: "Movie not found", data: ""});
            }
        })
        .catch((err) => 
        {
            console.error(err);
        })
    }
}
/**
 * This functions adds a movie into the database
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function AddMovie(req:Request, res:Response, next:NextFunction): void {
    let genres = (req.body.genres)? SanitizeArray(req.body.genres as string) : SanitizeArray("");
    let directors = (req.body.directors)? SanitizeArray(req.body.directors as string) : SanitizeArray("");
    let writers = (req.body.writers)? SanitizeArray(req.body.writers as string) : SanitizeArray("");
    let actors = (req.body.actors)? SanitizeArray(req.body.actors as string) : SanitizeArray("");
    let movie = new Movie({
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating
        });
        
        Movie.create(movie)
            .then(() => {
                res.status(200).json({success: true, msg: "Movie Added Successfully", data: movie});
            })
            .catch((err) =>{
                console.error(err);
            });
}

/**
 * This function takes a movie in the request params and creates an entry in the database
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function UpdateMovie(req:Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // ensure that id is valid
    if(id.length!=24) {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a movie", data: ""});
    }
    else {
        let genres = (req.body.genres)? SanitizeArray(req.body.genres as string) : SanitizeArray("");
        let directors = (req.body.directors)? SanitizeArray(req.body.directors as string) : SanitizeArray("");
        let writers = (req.body.writers)? SanitizeArray(req.body.writers as string) : SanitizeArray("");
        let actors = (req.body.actors)? SanitizeArray(req.body.actors as string) : SanitizeArray("");
        let movieToUpdate = new Movie({
            _id: id,
            movieID: req.body.movieID,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
                criticsRating: req.body.criticsRating
            });
            Movie.updateOne({_id: id}, movieToUpdate)
            .then(function(){
                res.status(200).json({success: true, msg: "Movie Updated Successfully", data: movieToUpdate});
            })
            .catch(function(err){
                console.error(err);
            });
        }
}

export function DeleteMovie(req:Request, res: Response, next:NextFunction): void {
    let id = req.params.id;
    
    // ensure that id is valid
    if(id.length!=24) {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a movie", data: ""});
    }
    else {
        Movie.deleteOne({_id: id})
        .then(() => {
            res.status(200).json({success: true, msg: "Movie Deleted", data:id})
        })
        .catch((err) => {
            console.error(err);
        })
    }
}