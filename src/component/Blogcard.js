import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ category, title, author, date, image, handleDelete,handleEdit, showDeleteButton , showEditButton }) => {
  const navigate = useNavigate();


  return (
    <div>
      <div className="w-full xl:w-full ml-2 h-20 p-3  border-gray-500">
        <div className="bg-[#fbfcff] rounded-xl shadow-lg overflow-hidden">
          <div className="h-[50%]  w-[100%] object-cover "><img className="h-60 w-[100%] " src={image} alt="" /></div>
          <p className="w-[92%] ml-3 text-center font-semibold pl-2 mt-2 justify-center space-x-5  rounded-lg  bg-[#9b9eeb]">
            {category}
          </p>
          <p className="text-gray-900 start-0 text-lg font-bold mt-3 ml-1 flex leading-tight mr-6 mb-2">
            {title}
          </p>
          <div className="flex">
            <p className="mt-2 ml-2 font-semibold font-sans  truncate text-ellipsis overflow-hidden">{author}</p>
          </div>
          <div className="flex">
            <p className="mt-1 ml-2 mb-4 font-thin font-sans text-xs">{date}</p>
           
            {showDeleteButton && <button className='ml-3 mb-2 bg-red-400 text-black text-base font-medium w-[20%] rounded-full' onClick={handleDelete}>Delete</button>}
            {/* {showDeleteButton && <button className='ml-3 mb-2 bg-blue-400 text-black text-base font-medium w-[20%] rounded-full' onClick={handleEdit}>Edit</button>} */}
            {showEditButton && (<button  className='ml-3 mb-2 bg-blue-400 text-black text-base font-medium w-[20%] rounded-full' onClick={handleEdit} >
    Edit
  </button>
)}
</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
