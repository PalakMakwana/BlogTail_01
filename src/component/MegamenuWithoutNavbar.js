import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "./Firebase1";
import { v4 } from "uuid";
import { imagedb } from "./Firebase1";
import toast from "react-hot-toast";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MegamenuWithoutNavbar({ postId, values, handleClose }) {
  const [imageUrl, setImageUrl] = useState("");
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
      setQuill(values.description || "");

      
      setImageUrl(values.image || "");
    }
  }, [values]);

  const addblog = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        let data = {
          category: value.category,
          title: value.title,
          date: value.date,
          description: quill,
          uid: user.uid,
        };

        
        if (imageUrl !== "") {
          data = { ...data, image: imageUrl };
        }

        if (postId) {
          
          await updateDoc(doc(db, "AddBlog", postId), data);
          toast.success("Blog Updated");
        } else {
        
          const docRef = await addDoc(collection(db, "AddBlog"), data);
          console.log("Document written with ID:", docRef.id);
          toast.success("Blog Created");
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleuploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageRef = ref(imagedb, `imgs/${v4()}`);

      uploadBytes(imageRef, file).then((resp) => {
        getDownloadURL(resp.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-3">
      <div className="mt-0">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Blog</h1>
        <form className="space-y-4" onSubmit={addblog}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="text-xl text-gray-900 mr-10">
                Select Category
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
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="tech">Tech</option>
              </select>
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

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div> */}
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
             {imageUrl && (
    <img src={imageUrl} alt="Preview" className="mt-2 max-w-52" />
  )}
          </div>

          <div>
            <label htmlFor="description" className="text-xl text-gray-900 mr-4 ">
              Add Description
            </label>
          </div>
          <ReactQuill
  theme="snow"
  value={quill}
  onChange={(content) => setQuill(content)}
/>

          {/* <ReactQuill theme="snow" value={quill} onChange={setQuill} /> */}
          {/* <div>
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
          </div> */}
          <button type="submit" className="text-white bg-gray-800  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save Changes</button>
          <button className="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2" onClick={handleClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default MegamenuWithoutNavbar;
