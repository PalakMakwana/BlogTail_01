
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "./Firebase1";
import { v4 } from "uuid";
import Nav from "./Nav";
import { imagedb } from "./Firebase1";
import { addDoc, collection, updateDoc,doc } from "firebase/firestore";

function Megamenu({ postId, values, handleClose  }) {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  // const[close,setClose]=useState(true);
  const [value, setValue] = useState({
    category: "", 
    title: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  const navigate = useNavigate();

  // const handleClose=()=>{
  //   setClose(false)
  // }
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


  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      setUsername("Unknown");
    }
  },[])

  
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
          date: value.date,
          image: imageUrl,
          description: value.description,
          uid: user.uid,
          username: username,

          
        };
  
        if (postId) {
        
          await updateDoc(doc(db, "AddBlog", postId), data);
          alert("Blog post updated successfully");
        } else {
         
          const docRef = await addDoc(collection(db, "AddBlog"), data);
          console.log("Document written with ID:", docRef.id);
          alert("Blog post added successfully");
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
    <div className="bg-[#40679E] min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-3">
        <div className="mt-0">
          <h1 className="text-3xl font-bold mb-4 text-gray-800"> Blog</h1>
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
{/* 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <button type="submit" className="text-white bg-gray-800 ml-96 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit Blog</button>
            {/* <button className="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2" onClick={handleClose}>Cancel</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Megamenu;
