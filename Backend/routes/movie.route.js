const express = require("express")
const movieRouter = express.Router()
const {moviemodel} = require("../models/movie.schema")
movieRouter.use(express.json())
const Joi = require('joi');

const movieSchema = Joi.object({
  Title: Joi.string().required(),
  Year: Joi.number().required(),
  Genre: Joi.string().required(),
  Director: Joi.string().required(),
  Language: Joi.string().required(),
  Poster: Joi.string().required(),
});
// Create: POST /api/movies
movieRouter.post('/', async (req, res) => {
    try {
     const {error} = movieSchema.validate(req.body)
     if(error){
        return res.status(400).json({ error: error.details[0].message })
     }
      
      const newMovie = new moviemodel(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Read: GET /api/movies
  movieRouter.get('/', async (req, res) => {
    try {
      const movies = await moviemodel.find();
      res.status(200).send(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Read: GET /api/movies/:id
  movieRouter.get('/:id', async (req, res) => {
    try {
      const movie = await moviemodel.findById(req.params.id);
      if (movie) {
        res.status(200).send(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update: PUT /api/movies/:id
  movieRouter.put('/:id', async (req, res) => {
    try {
      const { title, genre, year,Director,Language,Poster } = req.body;
      const updatedMovie = await moviemodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedMovie) {
        res.json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete: DELETE /api/movies/:id
  movieRouter.delete('/:id', async (req, res) => {
    try {
      const deletedMovie = await moviemodel.findByIdAndDelete(req.params.id);
      if (deletedMovie) {
        res.json(deletedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = { movieRouter } 