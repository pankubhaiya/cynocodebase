import React, { useState, useEffect } from 'react';
import './MovieForm.css'; // Import the CSS file

const MovieForm = ({ onAddMovie, onUpdateMovie, selectedMovie, onCloseForm }) => {
    const [formData, setFormData] = useState({
        Title: '',
        Year: '',
        Genre: '',
        Director: '',
        Language: '',
        Poster: '',
    });



    useEffect(() => {
        // If selectedMovie is provided, populate the form with its data
        if (selectedMovie) {
            setFormData(selectedMovie);
        }
    }, [selectedMovie]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if selectedMovie is provided for update, otherwise add a new movie
        if (selectedMovie) {
            await onUpdateMovie(selectedMovie._id, formData); // Use the correct prop name
        } else {
            onAddMovie(formData);
        }

        // Reset the form and close it
        setFormData({
            Title: '',
            Year: '',
            Genre: '',
            Director: '',
            Language: '',
            Poster: '',
        });
        onCloseForm();
    };

    return (
        <div className="movie-form-container">
            <h2>{selectedMovie ? 'Update Movie' : 'Add Movie'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} required />

                <label>Year:</label>
                <input type="number" name="Year" value={formData.Year} onChange={handleInputChange} required />

                <label>Genre:</label>
                <input type="text" name="Genre" value={formData.Genre} onChange={handleInputChange} required />

                <label>Director:</label>
                <input type="text" name="Director" value={formData.Director} onChange={handleInputChange} required />

                <label>Language:</label>
                <input type="text" name="Language" value={formData.Language} onChange={handleInputChange} required />

                <label>Poster:</label>
                <input type="text" name="Poster" value={formData.Poster} onChange={handleInputChange} required />

                <button type="submit">{selectedMovie ? 'Update Movie' : 'Add Movie'}</button>
            </form>
        </div>
    );
};

export default MovieForm;
