import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import series from './series';
import Serie from '../api/series/serieModel';
import Actor from '../api/actors/actorModel';
import actors from './actors';


async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await Serie.collection.drop().catch(err => console.log('TV Series collection not found'));
    await Actor.collection.drop().catch(err => console.log('Actors collection not found'));


    await User.create(users);
    await Movie.create(movies);
    await Serie.create(series);
    await Actor.create(actors);
    
    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    console.log(`${series.length} series loaded`);
    console.log(`${actors.length} actors loaded`);

    await mongoose.disconnect();
}

main();