import "./App.css";

import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Dashboard from './component/Dashboard'
import Megamenu from "./component/Megamenu";
import Nav from "./component/Nav";
import BlogDetails from "./component/BlogDetails";
import Home from "./component/Home";



function App() {
  return (
    <div>
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<Nav />} />
      
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/megamenu" element={<Megamenu/>} />
          <Route path="/home" element={<Home/>} />
         
          
            <Route path="/blog/:id/" element={<BlogDetails/>}/>      
            <Route path="/megamenu/edit/:id" element={<Megamenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
