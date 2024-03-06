import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase1";
import Footer from './Footer';
import { IoMdArrowRoundBack } from "react-icons/io";

function BlogDetail() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const Navigate = useNavigate('');

  useEffect(() => {
    const loged_in = localStorage.getItem("loggedin")
    if(loged_in == null){
      Navigate("/")
    }
  },[]);

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

  if (!blogData) {
    return <div className='ml-[35%] mt-[20%]' ><button type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
    <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>
    loading
</button></div>;
  }

  return (
    <>
      <div className=''>
        <button className='w-20 mb-11 text-2xl ml-20 mt-10'><IoMdArrowRoundBack onClick={() => Navigate("/home")}></IoMdArrowRoundBack></button>
        <span className="capitalize ml-5 sm:ml-0 sm:mr-auto text-[#092635]" style={{ fontFamily: 'Anton', letterSpacing: '5px', fontSize: '30px' }}>{blogData.category}</span>
        <span className=' text-[#092635] text-3xl' style={{ fontFamily: 'Anton', letterSpacing: '5px', fontSize: '30px' }}>.</span>
      </div>

      <div className="flex flex-col sm:flex-row">

        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold">{blogData.title}</h1>
                <div className="w-10 h-2 bg-green-700 my-4"></div>
                <div className="text-base sm:text-xl text-justify mb-10" dangerouslySetInnerHTML={{__html: blogData.description }}></div>
                <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0'>
                  <h3 className="text-black text-base sm:text-xl font-medium italic py-2">{blogData.date}</h3>
                  <span className="text-xl text-green-700 font-medium italic py-1">By~ {blogData.username}</span>
                </div>
              </div>
            </header>
          </div>
        </div>

        <img src={blogData.image} alt="Leafs" className="w-full sm:mt-10 h-auto sm:h-screen sm:w-4/12" />
      </div>
      <Footer />
    </>
  );
}

export default BlogDetail;
