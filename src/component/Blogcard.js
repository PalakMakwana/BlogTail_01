import { styled } from '@mui/material/styles';
import { CiCalendarDate } from "react-icons/ci";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BlogDetails from './BlogDetails'
import { Navigate, useNavigate } from 'react-router-dom';




const ReadMore = ({ children, onClick }) => {
  const htmlContent = children; // Assuming children is HTML content

  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
const Navigate= useNavigate('')
  return (
    <div className="text">
      <div style={{ display: "inline" }}>
        {isReadMore ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent?.slice(0, 70) }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </div>
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "green", cursor: "pointer" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </div>
  );
};

const BlogCardWrapper = styled('div')({
  
});

const Blogcard = ({ category, title, image, date, description, username, onDelete, onEdit, onClick, showActions = true }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

const handleTooltipHover = () => {
  setTooltipVisible(true);
};

const handleTooltipLeave = () => {
  setTooltipVisible(false);
};
  return (
    <BlogCardWrapper className=" overflow-hidden rounded-lg shadow-lg w-66 h-[96%]  flex flex-col relative "  >

      <div className="relative" onClick={onClick} onMouseEnter={handleTooltipHover}
    onMouseLeave={handleTooltipLeave}>

        <img className="w-full overflow-hidden h-36 " src={image} alt={title} />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        <div className="text-xs absolute top-0 right-0 bg-blue-500 font-bold capitalize px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
          {category}
        </div>
      </div>
      <div className="p-5 pt-4 flex justify-between items-center h-20">
        <div>
          <p className='text-black font-semibold capitalize overflow-hidden overflow-ellipsis max-h-16'>{title}</p>
        </div>
        {showActions && (
          <div className='flex space-x-3'>
            <button onClick={onDelete} className="text-red-700">
              <DeleteIcon />
            </button>
            <button onClick={onEdit} className="text-blue-500">
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      {/* <div className="px-6 py-4 h-18  h-28"> */}
      {/* <div className=" px-6 py-4 h-18  h-28 " >
        {description && (
          <ReadMore onClick={onClick}>{description}</ReadMore>
        )}
      </div> */}
       <p className=" px-6 py-4 h-18  h-28 " >
        {description && (
          <ReadMore navigateTo='/blogdetails' >{description}</ReadMore>
        )}
      </p>
      <div className="px-2 py-3 flex flex-row items-center justify-between mb-0 bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <CiCalendarDate className='text-yellow-800 font-bold text-2xl' />
          <span className="ml-1 text-md font-semibold italic">{date}</span>
        </span>
        <span className="text-brown-400 capitalize text-sm">
          By:  {username}
        </span>
      </div>
      {isTooltipVisible && (
          <div  className="absolute z-10  inline-block  px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
                          Click to See Full Blog
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        )}
    </BlogCardWrapper>
  );
};

export default Blogcard;
