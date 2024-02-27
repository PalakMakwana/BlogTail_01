import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { UilEnvelopeCheck } from "@iconscout/react-unicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase1";
function Login() {
  const [values, setValues] = useState({ email: "", passwd: "" });
  const [errormsg, setErrormsg] = useState("");
  const [show, setShow] = useState(false);

  const navi = useNavigate();

  const handleLogin = () => {
    if (!values.email || !values.passwd) {
      setErrormsg("not valid fields");
      return;
    }
  //   signInWithEmailAndPassword(auth, values.email, values.passwd)
  //     .then((response) => {
  //       navi("/megamenu");
  //     })
  //     .catch((error) => {
  //       setErrormsg("Invalid Credentials");
  //     });
  // };

  signInWithEmailAndPassword(auth, values.email, values.passwd)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.user.displayName)); 
      localStorage.setItem('loggedin', 'true'); 
      navi('/dashboard');
      console.log(response);
      
    })
    .catch((error) => {
      setErrormsg('Invalid Credentials');
      console.log('Error message:', error.message);
    
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
    <div className="flex h-screen">
      <div
        // style={{
        //   backgroundImage: `url(https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        // }}
        className=" bg-cover lg:block lg:w-screen h-screen relative"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <p class="animate-fade-down animate-ease-in  animate-delay-[2ms] absolute mt-24 left-14 text-white text-3xl font-bold font-serif">
          "There’s a whole world out there."
          <p className="text-base ml-5"> We’ll lead the way.</p>
        </p>
        <div className="backdrop-blur-xl bg-white/29 min-h-[70%] max-w-[27%] rounded-md shadow-2xl items-center justify-center ml-[62%]   mt-[8%]">
          <div className="flex items-center justify-center my-10">
            <h1 className="text-2xl mt-12 text-black font-bold font-mono">
              Log In
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-4">
              <div className="relative z-0">
                <span className="absolute start-[90%] bottom-3 text-[#272829] dark:text-[#272829]">
                  <svg
                    class="w-6 h-6 text-gray-800 mt-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 15"
                  >
                    <UilEnvelopeCheck />
                  </svg>
                </span>
                <input
                  type="email"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-72 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
                  placeholder=" "
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm ml-1  text-[#272829]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Email
                </label>
              </div>
            </div>

            <div className="mt-4">
              <div class="relative">
                <input
                  type={show ? "text" : "password"}
                  id="floating_standard"
                  className="block py-2.5 px-0 w-72 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
                  placeholder=" "
                  name="passwd"
                  value={values.passwd}
                  onChange={handleInput}
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm ml-1  text-[#272829] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>
                <div
                  className="absolute right-1 top-2 cursor-pointer"
                  onClick={handleShow}
                >
                  {show ? <UilEyeSlash /> : <UilEye />}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text text-[#eb9665] ">{errormsg}</h3>
            <button
              onClick={handleLogin}
              className="text-xs text-[#FFF6E0] rounded-md border-slate-900 w-72 mt-7 ml-8 h-8 bg-[#272829] hover:bg-gradient-to-r from-[#6f6f70] font-semibold"
            >
              {" "}
              Login
            </button>
            <span>
              <p className="flex text-s mt-7 ml-14 text-gray   ">
                Click here for New User ?{" "}
                <Link
                  to="/register"
                  className=" hover:scale-125 text-cyan-950  ml-3 text-base font-semibold underline underline-offset-4 ease-out duration-300"
                >
                  {" "}
                  Register{" "}
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
