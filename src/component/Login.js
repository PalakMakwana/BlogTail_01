import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { UilEnvelopeCheck } from "@iconscout/react-unicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase1";
import toast from 'react-hot-toast';

function Login() {
  const [values, setValues] = useState({ email: "", passwd: "" });
  const [errormsg, setErrormsg] = useState("");
  const [show, setShow] = useState(false);
  const navi = useNavigate();

  const handleLogin = () => {
    if (!values.email || !values.passwd) {
      setErrormsg("Not valid fields");
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.passwd)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user.displayName));
        localStorage.setItem('loggedin', 'true');
        navi('/home');
        toast.success('Successfully logged in!');
      })
      .catch((error) => {
        console.log('Error message:', error.message);
        toast.error('Invalid Credentials');
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div class="bg-cover bg-center bg-fixed  " style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/01/15/20/37/sea-4768869_1280.jpg')" }}
    >
      
        {/* <video
          autoPlay
          loop
          muted
          className="absolute bg-cover bg-center bg-fixed"
        >
          <source src='https://cdn.pixabay.com/vimeo/538877060/waves-70796.mp4?width=1280&hash=d44e766f75781436dc1030b203ec7d7b1ecd5221' type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
          <p class="animate-fade-down animate-ease-in  animate-delay-[2ms] absolute mt-12 left-14 text- text-3xl font-bold font-serif">
          "There’s a whole world out there."
          <p className="text-base ml-5"> We’ll lead the way.</p>
        </p>
      <div class="h-screen relative flex justify-center items-center">
        <div class="bg-white/55 mx-4 p-8 rounded mt-10 shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 class="text-3xl font-bold mb-8 text-center">Login</h1>
          <form>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700 mb-2" for="email">
                Email Address
              </label>
              <div className="relative">
              <input
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="email" placeholder="Enter your email address"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
               <div
                  class="absolute right-1 top-2 cursor-pointer"
                
                >
                  <UilEnvelopeCheck/>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-700 mb-2" for="password">
                Password
              </label>
              <div class="relative">
                <input
                  class="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password" type={show ? "text" : "password"} placeholder="Enter your password"
                  name="passwd"
                  value={values.passwd}
                  onChange={handleInput}
                />
                <div
                  class="absolute right-1 top-2 cursor-pointer"
                  onClick={handleShow}
                >
                  {show ? <UilEyeSlash /> : <UilEye />}
                </div>
              </div>
              {/* <a class="text-gray-600 hover:text-gray-800" href="#">Forgot your password?</a> */}
            </div>
            <div class="mb-6">
              <button
                class="bg-[#272829] hover:bg-gradient-to-r from-[#6f6f70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <h3 class="text text-[#eb9665] ">{errormsg}</h3>
          
            <span>
              <p class="flex text-s mt-7 text-gray   ">
                Click here for New User?{" "}
                <Link
                  to="/register"
                  class="hover:scale-125 text-cyan-950 ml-3 text-base font-semibold underline underline-offset-4 ease-out duration-300"
                >
                  Register
                </Link>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
