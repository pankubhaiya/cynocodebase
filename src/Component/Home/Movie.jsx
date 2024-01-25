import React from 'react';
import './movie.css';

const Movie = ({ movie, onDelete, onUpdate }) => {
  const handleDelete = () => {
    
    onDelete(movie._id);
  };

  const handleUpdate = () => {
   
    onUpdate(movie._id);
  };

  return (
    
    <div className="movie-container">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-details">
        <h2>{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Genre: {movie.Genre}</p>
        <p>Director: {movie.Director}</p>
        <p>Language: {movie.Language}</p>
      
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Movie;
