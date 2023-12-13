import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export class Home extends Component {
  render() {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        <h1>Welcome to the home page</h1>
        <div>Add All medications <span>+</span></div>
        <div>Add All Running Your medications</div>
      </div>
    );
  }
}

export default Home;
