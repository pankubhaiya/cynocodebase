import logo from './logo.svg';
import './App.css';
import { Routes, Route ,Navigate } from "react-router-dom";
import Signin from './Component/Signin';
import SignUp from './Component/Signup';
import Home from './Component/Home/Home';
function App() {
  const token = localStorage.getItem('token');
 
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
