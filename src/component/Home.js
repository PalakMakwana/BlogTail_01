import React, { useEffect, useState } from 'react';
import BlogCard from './Blogcard';
import { collection, getDocs, query, where } from "firebase/firestore";
import {  db } from "./Firebase1";

import { Link } from 'react-router-dom';
import { UilArrowLeft } from '@iconscout/react-unicons'

import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

function Home() {
  const [getData, setGetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [select, setSelect] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      let querySnapshot;
      if (select !== "") {
        querySnapshot = await getDocs(
          query(collection(db, "AddBlog"), where("category", "==", select))
        );
      } else {
        querySnapshot = await getDocs(collection(db, "AddBlog"));
      }
    
      const blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));


      setGetData(blogs);
    };

    fetchdata();
  }, [select]);

  useEffect(() => {
    const loged_in = localStorage.getItem("loggedin")
    if(loged_in == null){
      navigate("/")
    }
  },[]);

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       localStorage.removeItem('loggedin');
  //       navigate('/');
  //     })
  //     .catch((error) => {
  //       console.log('Error during logout:', error.message);
  //     });
  // };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getData.length / itemsPerPage);

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button
          key={i}
          className={`mx-1 px-2 py-1 bg-gray-200 rounded-md ${currentPage === i ? 'bg-gray-400' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pagination;
  };

  return (
    <>
     <Nav />
     
    <div >
     
    <UilArrowLeft className='w-14 h-14' onClick={()=>navigate('/dashboard')}/>
    </div>
    <select
            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">-Select-</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="tech">Tech</option>
          </select>
        <div className="grid grid-cols-4 mt-10 grid-row-2 gap-2">
        {currentItems.map((values, index) => (
          <div className="ml-0 mb-96" key={values.id} >
            <Link to={`/blog/${values.id}`}>
              <BlogCard
                className=""
                index={index + 1}
                username={values.username}
                category={values.category}
                title={values.title}
                date={values.date}
                image={values.image}
                showDeleteButton={false}
              />
            </Link>
          </div>
        ))}
      </div>
     
      <div className= 'flex justify-center mt-4'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mx-1 px-2 py-1 bg-gray-200 rounded-md">«</button>
        {renderPagination()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="mx-1 px-2 py-1 bg-gray-200 rounded-md">»</button>
      </div> 
    
    </>
  );
}

export default Home;
