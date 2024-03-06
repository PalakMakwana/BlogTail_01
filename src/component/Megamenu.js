import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "./Firebase1";
import { v4 } from "uuid";
import Nav from "./Nav";
import { imagedb } from "./Firebase1";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Megamenu({ postId, values, handleClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [quill, setQuill] = useState('');
  const [value, setValue] = useState({
    category: "",
    title: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (values) {
      setValue({
        category: values.category || "",
        title: values.title || "",
        date: new Date().toISOString().slice(0, 10),
        description: values.description || "",
      });
    }
  }, [values]);

  useEffect(() => {
    const loged_in = localStorage.getItem("loggedin")
    if(loged_in == null){
      navigate("/")
    }
  },[]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      setUsername("Unknown");
    }
  }, []);

  const addblog = async (e) => {
    e.preventDefault();
    if (!imageUrl || !value.category || !value.title) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const user = await auth.currentUser;
      if (user) {
        const data = {
          category: value.category,
          title: value.title,
           date: value.date,
          image: imageUrl,
          description: quill,
          uid: user.uid,
          username: username,
        };

        if (postId) {
          await updateDoc(doc(db, "AddBlog", postId), data);
          toast.success("Blog post updated successfully");
        } else {
          const docRef = await addDoc(collection(db, "AddBlog"), data);
          console.log("Document written with ID:", docRef.id);
          toast.success("Blog Posted Successfully");
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save changes");
    }
  };

  const handleuploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageRef = ref(imagedb, `imgs/${v4()}`);

      uploadBytes(imageRef, file).then((resp) => {
        console.log("Image uploaded successfully:", resp);
        getDownloadURL(resp.ref).then((url) => {
          console.log("Image URL retrieved:", url);
          setImageUrl(url);
        });
      });
    }
  };

  return (
    <div className="min-h-screen">
      <h1> </h1>
      <Nav />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <div className="mt-0">
          <form className="space-y-4 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto" onSubmit={addblog}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="text-xl text-gray-900 md:mr-2"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="input-field border border-gray-300 rounded-md p-2 w-full"
                  value={value.category}
                  onChange={(e) =>
                    setValue({ ...value, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Tech</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="text-xl text-gray-900 md:mt-4"
                >
                  Add Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input-field border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Title"
                  value={value.title}
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="text-xl text-gray-900 mt-4">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="input-field border border-gray-300 rounded-md p-2 w-full"
                onChange={handleuploadImage}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-xl text-gray-900 mt-4">
                Add Description
              </label>
            </div>
            <div>
              {/* <textarea
                id="description"
                name="description"
                rows="4"
                className="input-field border border-gray-300 rounded-md w-full"
                placeholder="Write your thoughts here..."
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              ></textarea> */}
          <ReactQuill theme="snow" value={quill} onChange={setQuill} />

            </div>

            <button
              type="submit"
              className="relative text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mt-4 w-full"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Megamenu;