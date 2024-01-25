import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MovieItem from './Movie';
import MovieForm from './Addmovie';

const Home = () => {
  const token = localStorage.getItem('token');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return <Navigate to="/" />;
      }

      try {
        const response = await fetch('https://relieved-mite-dirndl.cyclic.app/movie');
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
      const response = await fetch('https://relieved-mite-dirndl.cyclic.app/movie/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieData),
      });

      if (response.ok) {
        const addedMovie = await response.json();
        setMovies((prevMovies) => [...prevMovies, addedMovie]);
        setShowForm(false); 
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`https://relieved-mite-dirndl.cyclic.app/movie/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
       
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      } else {
        console.error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = async(movieId,updatedMovieData) => {
    
    try {
     
      const response = await fetch(`https://relieved-mite-dirndl.cyclic.app/movie/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovieData),
      });
  
      if (response.ok) {
      
        const updatedMovie = await response.json();
  
        
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie._id === movieId ? updatedMovie : movie))
        );
  
       
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
       onUpdateMovie={handleUpdate} 
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
