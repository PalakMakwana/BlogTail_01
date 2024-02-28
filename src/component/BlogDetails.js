// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./Firebase1";

// function BlogDetail() {
//   const { id } = useParams();
//   const [blogData, setBlogData] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const blogRef = doc(db, "AddBlog", id);
//         const blogS = await getDoc(blogRef);
//         if (blogS.exists()) {
//           setBlogData(blogS.data());
//         } else {
//           console.log("No Blog Found!");
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (!blogData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='w-full h-full flex item  '>
       
//         <div className='relative w-[55%] h-screen flex flex-col' >
//         <img src={blogData.image} className='text-black h-full flex rounded-lg ' alt="Blog" />
//         </div>

//     <div className='  flex-col text-justify flex justify-between h-full p-4  px-6 w-[40%]'>
       
//       <p className='mb-2 font-semibold '>Category: {blogData.category}</p>
//       <p className='mb-2 font-semibold '>Title: {blogData.title}</p>
//       <p className='mb-2 mt-5 font-bold text-lg '> {blogData.description}
    
//       </p>
//       <p className='mb-2 mt-4 font-md'>Author: {blogData.author}</p>
//       <p className='mb-2 font-md'>Date: {blogData.date}</p>
//     </div>
//     </div>
//   );
// }

// export default BlogDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase1";

function BlogDetail() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "AddBlog", id);
        const blogS = await getDoc(blogRef);
        if (blogS.exists()) {
          setBlogData(blogS.data());
        } else {
          console.log("No Blog Found!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const viewDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

 
  const descriptionLines = blogData.description.split('\n');
 
  const displayedDescription = showFullDescription ? descriptionLines.join('\n') : descriptionLines.slice(0, 7).join('\n');
  const readMoreButton = descriptionLines.length > 10 ? (
    <button  className='text-[#1e2f97] hover:text-[#26b170] w-24   ' onClick={viewDescription}>
      {showFullDescription ? '...Read Less' : '...Read More'}
    </button>
  ) : null;

  return (
    <div className='w-full h-full flex item'>
      <div className='relative w-[55%] h-screen flex flex-col'>
        <img src={blogData.image} className='text-black h-full flex rounded-lg ' alt="Blog" />
      </div>
      <div className='flex-col text-justify flex justify-between h-full p-4  px-6 w-[40%]'>
        <p className='mb-2 font-semibold'>Category: {blogData.category}</p>
        <p className='mb-2 font-semibold'>Title: {blogData.title}</p>
        <p className='mb-2 mt-5 font-bold text-lg'>{displayedDescription}</p>
        {readMoreButton}
        {/* <p className='mb-2 mt-4 font-md'>Author: {blogData.author}</p> */}
        <p className='mb-2 font-md'>Date: {blogData.date}</p>
      </div>
    </div>
  );
}

export default BlogDetail;
