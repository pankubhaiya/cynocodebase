import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MovieItem from './Movie';
import MovieForm from './Addmovie';

const Home = () => {
  const token = localStorage.getItem('token');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return <Navigate to="/" />;
      }

      try {
        const response = await fetch('http://localhost:9090/movie');
        const data = await response.json();

        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, [token]);


  const handleAddMovie = async (newMovieData) => {
    try {
      const response = await fetch('http://localhost:9090/movie/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieData),
      });

      if (response.ok) {
        const addedMovie = await response.json();
        setMovies((prevMovies) => [...prevMovies, addedMovie]);
        setShowForm(false); // Close the form after adding the movie
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:9090/movie/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted movie from the state
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      } else {
        console.error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = async(movieId,updatedMovieData) => {
    // Fetch the selected movie details based on movieId
    try {
      // Make a PUT request to update the movie with the provided data
      const response = await fetch(`http://localhost:9090/movie/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovieData),
      });
  
      if (response.ok) {
        // If the update is successful, get the updated movie data
        const updatedMovie = await response.json();
  
        // Update the movies state with the new movie data
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie._id === movieId ? updatedMovie : movie))
        );
  
        // Close the form and reset selectedMovie
        setShowForm(false);
        setSelectedMovie(null);
      } else {
        console.error('Failed to update movie');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
    const selectedMovie = movies.find((movie) => movie._id === movieId);
    setSelectedMovie(selectedMovie);
    setShowForm(true);;
  };


  return (
    <div>
    <h2>Movie List</h2>
    <button onClick={() => setShowForm(!showForm)}>
      {showForm ? 'Close Form' : 'Add Movie'}
    </button>

    <div>
      {showForm && (
       <MovieForm
       onAddMovie={handleAddMovie}
       onUpdateMovie={handleUpdate} // Use the correct prop name
       selectedMovie={selectedMovie}
       onCloseForm={() => {
         setShowForm(false);
         setSelectedMovie(null);
       }}
     />
      )}
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul style={{ display: showForm ? 'none' : 'block' }}>
        {movies.map((movie) => (
          <MovieItem
            key={movie._id}
            movie={movie}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    )}
  </div>
  );
};

export default Home;
