import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UilEnvelopeCheck } from "@iconscout/react-unicons";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase1";

function Register() {
  const [show, setShow] = useState(false);
  const navi = useNavigate("");
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    passwd: "",
    contact: "",
  });
  const [errormsg, setErrormsg] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.name = "Required";
    } else if (
      !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/i.test(values.email)
    ) {
      errors.email = "invalid email format";
    }

    if (!values.passwd) {
      errors.name = "Required";
    }
    return errors;
  };

  const handleSubmit = () => {
    const Errors = validate(values);
    if (Object.keys(Errors).length > 0) {
      setErrormsg("Fill out all fields");
      return;
    }
    setErrormsg("");

    createUserWithEmailAndPassword(auth, values.email, values.passwd).then(
      async (response) => {
        const user = response.user;
        await updateProfile(user, { displayName: values.name });
      }
    );
    navi("/");
  };

  return (
    // < form onClick={handleSubmit}>
    <div className="flex h-screen">
      <div
        // style={{
        //   backgroundImage: `url(https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        // }}
        className="bg-cover lg:block lg:w-screen h-screen relative"
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
        <div className="backdrop-blur-xl bg-white/29 min-h-[70%] max-w-[35%] rounded-md shadow-2xl items-center justify-center ml-[59%] mt-[6%]">
          <div className="flex  items-center justify-center ">
            <h1 className="text-xl mt-7 text-black font-bold font-mono">
              Registration
            </h1>
          </div>
          <div className="flex flex-col items-center mr-4 justify-center">
            <div>
            <div className="mt-14 flex items-center">
  <div className="relative z-0">
    <span className="absolute start-[90%] bottom-3 text-[#272829] dark:text-[#272829]">
      <svg
        class="w-6 h-6 ml-1 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 8"
      >
        <MdDriveFileRenameOutline className="w-6 h-6 text-gray-800 dark:text-white" />
      </svg>
    </span>
    <input
      type="text"
      id="name"
      className="block py-2.5 px-0 w-44 text-sm text-[#272829] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
      placeholder=" "
      name="name"
      value={values.name}
      onChange={handleInput}
    />
    <label
      htmlFor="name"
      className="absolute text-sm text-[#272829] ml-1 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      Name
    </label>
  </div>
  <div className="relative z-0 ml-9">
    <span className="absolute start-[90%] bottom-3 text-[#272829] dark:text-[#272829]">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 15"
      >
        <path
          fill-rule="evenodd"
          d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <input
      type="text"
      id="username"
      className="block py-2.5 px-0 w-44  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
      placeholder=" "
      name="username"
      value={values.username}
      onChange={handleInput}
    />
    <label
      htmlFor="username"
      className="absolute text-sm ml-1 text-[#272829] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      Username
    </label>
  </div>
</div>

            </div>
            {/*-----------------------------------*/}

            <div className="mt-4 flex items-center ">
  <div className="relative z-0">
    <span className="absolute start-[90%] bottom-3 text-[#272829] dark:text-[#272829]">
      <svg
        class="w-6 h-6 mr-2 text-gray-800 dark:text-white"
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
      id="email"
      className="block py-2.5 px-0 w-44 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
      placeholder=" "
      name="email"
      value={values.email}
      onChange={handleInput}
    />
    <label
      htmlFor="email"
      className="absolute text-sm ml-1  text-[#272829] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      Email
    </label>
  </div>
  <div className="relative z-0 ml-7">
    <span className="absolute start-[90%] bottom-3 text-[#272829] dark:text-[#272829]">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white mt-6 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 15"
      >
        <path
          fill-rule="evenodd"
          d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <input
      type={show ? "text" : "password"}
      id="passwd"
      className="block py-2.5 px-0 w-44 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
      placeholder=" "
      name="passwd"
      value={values.passwd}
      onChange={handleInput}
    />
    <label
      htmlFor="passwd"
      className="absolute text-sm text-[#272829]  ml-1 mb-16 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      Password
    </label>
    <div
      className="absolute left-[90%] top-[23%] cursor-pointer"
      onClick={handleShow}
    >
      {show ? <UilEyeSlash /> : <UilEye />}
    </div>
  </div>
</div>

            <div className="mt-4 ">
              <div class="relative z-0">
               
                <input
                  type="tel"
                  id="contact"
                  className="block py-2.5 px-0 w-44 mr-52  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#272829] peer"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder=" "
                  name="contact"
                  value={values.contact}
                  onChange={handleInput}
                />
                <label
                  for="contact"
                  className="absolute text-sm text-[#272829] ml-1 mb-16 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[]\#272829] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Phone number
                </label>
                <span class="absolute start-[42%]  bottom-3 text-[#272829] dark:text-[#272829]">
                  <svg
                    class="w-4 h-4 mr-7 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 19 18"
                  >
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <h3 className="text text-[#eb9665] ">{errormsg}</h3>
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-xs text-[#FFF6E0] rounded-md border-slate-900 w-96 mt-8 ml-1 h-8 bg-[#272829] hover:bg-gradient-to-r from-[#6f6f70] font-semibold"
              >
                {" "}
                Register
              </button>
              <span>
                <p className="flex text-md mt-6 mb-7 ml-32 text-gray   ">
                  Already a User ?{" "}
                  <Link
                    to="/"
                    className="text-cyan-950 hover:scale-125  ml-3 text-base font-semibold underline underline-offset-4 ease-out duration-300"
                  >
                    {" "}
                    Login{" "}
                  </Link>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </form>
  );
}

export default Register;
