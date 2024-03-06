import React, { useEffect, useState } from "react";
import BlogCard from "./Blogcard";
import MegamenuWithoutNavbar from "./MegamenuWithoutNavbar";
import { UilPlusCircle } from "@iconscout/react-unicons";
import Footer from "./Footer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./Firebase1";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Dialog from "@mui/material/Dialog";
import toast from "react-hot-toast";

function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [select, setSelect] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [getData, setGetData] = useState([]);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleTooltipHover = () => {
    setTooltipVisible(true);
  };

  const handleTooltipLeave = () => {
    setTooltipVisible(false);
  };

  const fetchUserPosts = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        let q;
        if (select === "") {
          q = query(collection(db, "AddBlog"), where("uid", "==", user.uid));
        } else {
          q = query(
            collection(db, "AddBlog"),
            where("uid", "==", user.uid),
            where("category", "==", select)
          );
        }
        const querySnapshot = await getDocs(q);
        const userPostsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          username: doc.data().username,
        }));
        userPostsData.sort((b,a) => new Date(a.date) - new Date(b.date));
        // userPostsData.sort((a, b) => {
        //   const dateA = new Date(a.date);
        //   const timeA = dateA.getTime();

        //   const dateB = new Date(b.date);
        //   const timeB = dateB.getTime();

        //   return timeB - timeA;
        
        // });

        setUserPosts(userPostsData);
      } else {
        console.log("User not logged in.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const loged_in = localStorage.getItem("loggedin");
    if (!loged_in) {
      navigate("/");
    } else {
      fetchUserPosts();
    }
  }, [select]);

  const handleDelete = async (id) => {
    const deletedb = doc(db, "AddBlog", id);
    await deleteDoc(deletedb);
    navigate("/dashboard");
    toast.success("Blog Deleted ");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedin");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error during logout:", error.message);
      });
  };

  const handleEdit = async (id) => {
    setSelectedPostId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlogCardClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button
          key={i}
          className={`rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out ${
            currentPage === i ? "bg-gray-400" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pagination;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getData.length / itemsPerPage);

  const textShadowStyle = {
    textShadow: "2px 2px 4px rgba(56, 122, 223, 1)",
  };
  return (
    <>
      <div className="space-y-2">
        <h1
          className=" "
          style={{
            ...textShadowStyle,
            fontFamily: "Anton",
            textAlign: "center",
            letterSpacing: "5px",
            fontSize: "50px",
          }}
        >
          The Author
        </h1>
        {!openDialog && <Nav />}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full ">
          {userPosts ? (
            <div className="">
              <div className="grid grid-cols-1   sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  mt-10 grid-row-2">
                <div className="overflow-hidden rounded-lg mb-20 shadow-lg w-66 h-[88%] mt-8 ml-10  flex flex-col bg-gray-200">
                  <UilPlusCircle
                    onClick={() => navigate("/megamenu")}
                    onMouseEnter={handleTooltipHover}
                    onMouseLeave={handleTooltipLeave}
                    className="h-48 w-48 mt-28 ml-10  rounded-full text-white bg-gradient-to-r from-sky-300 to-indigo-600 "
                    style={{
                      boxShadow: "0 2px 4px rgba(17, 0, 158, 0.5)",
                      border: "none",
                    }}
                  />
                  {isTooltipVisible && (
                    <div className="absolute inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
                      Click Here To Add Blog
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  )}
                </div>

                {userPosts.map((values, index) => (
                  <div className="ml-0 mb-4 mt-8 pe-5 ps-5" key={values.id}>
                    <div className="link-style">
                      <BlogCard
                        index={index + 1}
                        username={values.username}
                        category={values.category}
                        description={values.description}
                        title={values.title}
                        date={values.date}
                        image={values.image}
                        onDelete={() => handleDelete(values.id)}
                        onEdit={() => handleEdit(values.id)}
                        onClick={() => handleBlogCardClick(values.id)}
                      />
                    </div>
                  </div>
                ))}
                {/* <h1 className="mt-52"> .....upcoming Blogs</h1> */}
                
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            {openDialog && selectedPostId && (
              <MegamenuWithoutNavbar
                postId={selectedPostId}
                values={userPosts.find((post) => post.id === selectedPostId)}
                handleClose={handleCloseDialog}
              />
            )}
          </Dialog>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-2 py-1 bg-gray-200 rounded-md"
        >
          «
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1 px-2 py-1 bg-gray-200 rounded-md"
        >
          »
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
