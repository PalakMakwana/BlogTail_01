import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "./Firebase1";
import { v4 } from "uuid";
import Nav from "./Nav";
import { imagedb } from "./Firebase1";
// import { UilMultiply } from "@iconscout/react-unicons";
// import { UilEstate } from "@iconscout/react-unicons";
// import { UilBlogger } from "@iconscout/react-unicons";

function Megamenu() {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState({
    category: "",
    title: "",
    author: "",
    date: "",
    description: "",
  });
  const navigate = useNavigate("");

  
  useEffect(() => {
    if (location.state && location.state.postToEdit) {
      const postToEdit = location.state.postToEdit;
      setValue({
        category: postToEdit.category,
        title: postToEdit.title,
        author: postToEdit.author,
        date: postToEdit.date,
        description: postToEdit.description,
      });
      setImageUrl(postToEdit.image);
    }
  }, [location.state]);
  useEffect(() => {
    const loged_in = localStorage.getItem("loggedin");
    if (loged_in == null) {
      navigate("/");
    }
  }, []);



 
  const addblog = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please upload an image");
      return;
    }
  
    try {
      const user = await auth.currentUser;
      if (user) {
        const data = {
          category: value.category,
          title: value.title,
          author: value.author,
          date: value.date,
          image: imageUrl,
          description: value.description,
          uid: user.uid,
        };
  
        if (location.state && location.state.postToEdit) {
          // If editing existing post
          const postId = location.state.postToEdit.id;
          const postRef = doc(db, "AddBlog", postId);
          await updateDoc(postRef, data);
        } else {
          // If adding new post
          const docRef = await addDoc(collection(db, "AddBlog"), data);
          console.log("Document written with ID:", docRef.id);
        }
        
        navigate("/dashboard");
        alert("Blog post updated successfully");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding/updating document:", error);
      alert("Failed to update blog post");
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
  const categories = ["Food", "Travel", "Tech"];
  return (
    <div className="bg-[#40679E] min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-3">
        {/* <button
          className="text-white hover:text-gray-100"
          onClick={() => navigate("/dashboard")}
        > */}
          {/* <UilEstate className="w-16 h-16" /> */}
        {/* </button> */}
        <div className="mt-0">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Add Blog</h1>
          <form className="space-y-4" onSubmit={addblog}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="text-xl text-gray-900 mr-10">
                  Add Category
                </label>
                <select
            id="category"
            name="category"
            className="input-field border border-gray-300 rounded-md p-2"
            value={value.category}
            onChange={(e) =>
              setValue({ ...value, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

{/*                 
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="input-field border border-gray-300 rounded-md p-2"
                  placeholder="Category"
                  value={value.category}
                  onChange={(e) =>
                    setValue({ ...value, category: e.target.value })
                  }
                /> */}
              </div>
              <div>
                <label htmlFor="title" className="text-xl text-gray-900 mr-5">
                  Add Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input-field border border-gray-300  ml-5 rounded-md p-2"
                  placeholder="Title"
                  value={value.title}
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                />
              </div>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="text-xl text-gray-900">
                  Author name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="input-field border border-gray-300 rounded-md ml-11 p-2"
                  placeholder="Author Name"
                  value={value.author}
                  onChange={(e) =>
                    setValue({ ...value, author: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="date" className="text-xl text-gray-900">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="input-field border border-gray-300 ml-20 w-[48%] rounded-md p-2"
                  value={value.date}
                  onChange={(e) =>
                    setValue({ ...value, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label htmlFor="image" className="text-xl text-gray-900">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="input-field border ml-8 w-52  border-gray-300 rounded-md p-2"
                onChange={handleuploadImage}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-xl text-gray-900 mr-4 ">
                Add Description
              </label>
            </div>
            <div>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="input-field border border-gray-300 rounded-md w-[80%]"
                placeholder="Write your thoughts here..."
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit" className="text-white bg-gray-800 ml-96 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add blog</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Megamenu;