import {Collection, Schema, model} from 'mongoose';

// Movie Interface
export interface IMovie {
    movieId: string,
    title: string,
    studio: string,
    genres: string[],
    directors: string[],
    writers: string[],
    actors: string[],
    year: number,
    length: number,
    shortDescription: string,
    mpaRating: string,
    criticsRating: number
}

// Movie Schema

let movieSchema = new Schema<IMovie>({
    movieId: String,
    title: String,
    studio: String,
    genres: [String],
    directors: [String],
    writers: [String],
    actors: [String],
    year: Number,
    length: Number,
    shortDescription: String,
    mpaRating: String,
    criticsRating: Number
});

let Movie = model<IMovie>('Movie', movieSchema);

export default Movie;