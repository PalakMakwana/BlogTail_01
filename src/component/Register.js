import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UilEnvelopeCheck } from "@iconscout/react-unicons";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase1";
import { db } from "./Firebase1";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function Register() {
  const [show, setShow] = useState(false);
  const navi = useNavigate();
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    passwd: "",
    contact: "",
  });
  const [errormsg, setErrormsg] = useState("");

  const dbref = collection(db, "AddUser");

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
      toast.error("Name Required");
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/i.test(values.email)
    ) {
      errors.email = "invalid email format";
      toast.error("invalid email type");
    }

    if (!values.passwd) {
      errors.passwd = "Required";
      toast.error("Password Required");
    }
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      toast.error("Fill out Empty Field");
      return;
    }
    setErrormsg("");

    createUserWithEmailAndPassword(auth, values.email, values.passwd).then(
      async (response) => {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user.displayName)
        );
        await addDoc(dbref, { value: values });
        const user = response.user;
        await updateProfile(user, { displayName: values.name });
      }
    );
    toast.success("Registration Successful");
    navi("/");
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/01/15/20/37/sea-4768869_1280.jpg')" }}
      
    >
      
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white/60 mx-4 p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-2/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Registration</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4 relative">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  id="name"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                />
                <MdDriveFileRenameOutline className="w-6 h-6 text-gray-800 dark:text-white ml-2" />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  id="username"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your username"
                  name="username"
                  value={values.username}
                  onChange={handleInput}
                />
                <MdDriveFileRenameOutline className="w-6 h-6 text-gray-800 dark:text-white ml-2" />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="flex items-center w-full">
                <input
                  type="email"
                  id="email"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email address"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                />
                <UilEnvelopeCheck className="ml-2" />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="passwd"
              >
                Password
              </label>
              <div className="flex items-center w-full">
                <input
                  type={show ? "text" : "password"}
                  id="passwd"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  name="passwd"
                  value={values.passwd}
                  onChange={handleInput}
                />
                <div className="cursor-pointer" onClick={handleShow}>
                  {show ? (
                    <UilEyeSlash className="ml-2" />
                  ) : (
                    <UilEye className="ml-2" />
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="contact"
              >
                Phone number
              </label>
              <div className="flex items-center w-full">
                <input
                  type="tel"
                  id="contact"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Enter your phone number"
                  name="contact"
                  value={values.contact}
                  onChange={handleInput}
                />
                <MdDriveFileRenameOutline className="w-6 h-6 ml-2 rtl:rotate-[270deg]" />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text text-[#eb9665] ">{errormsg}</h3>
            </div>
<div className="flex space-x-10">
            <div className="mb-6">
              <button
                className="bg-[#272829] hover:bg-gradient-to-r from-[#6f6f70] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>

            <div>
              <p className="flex text-md mt-2 mb-7 text-gray">
                Already a User ?{" "}
                <Link
                  to="/"
                  className="text-cyan-950 hover:scale-125 ml-3 text-base font-semibold underline underline-offset-4 ease-out duration-300"
                >
                  {" "}
                  Login{" "}
                </Link>
              </p>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
