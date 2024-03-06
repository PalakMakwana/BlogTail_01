import "./App.css";
import { Toaster } from 'react-hot-toast';
import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Dashboard from './component/Dashboard'
import Megamenu from "./component/Megamenu";
import Nav from "./component/Nav";
import BlogDetails from "./component/BlogDetails";
import Home from "./component/Home";
import About from "./component/About";
import Footer from "./component/Footer";


function App() {
  return (
    <div>
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<Nav />} />
      
          <Route path="/register" element={<Register />} />   
          <Route path="/footer" element={<Footer />} />   
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/megamenu" element={<Megamenu/>} />
          <Route path="/home" element={<Home/>} />
         
          
            <Route path="/blog/:id/" element={<BlogDetails/>}/>      
            <Route path="/megamenu/edit/:id" element={<Megamenu />} />
            
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </div>
  );
}

export default App;
