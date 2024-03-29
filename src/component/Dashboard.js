import React, { useEffect, useState } from "react";
import BlogCard from "./Blogcard";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MegamenuWithoutNavbar from "./MegamenuWithoutNavbar";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./Firebase1";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Dialog from "@mui/material/Dialog";

function Dashboard() {


  const [userPosts, setUserPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [select, setSelect] = useState("");
  const [openDialog, setOpenDialog] = useState(false); 
  const navigate = useNavigate();
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [getData, setGetData] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        let q;
        if (select === "") {
          q = query(
            collection(db, "AddBlog"),
            where("uid", "==", user.uid)
          );
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
      {!openDialog && <Nav />} 
      <div>
        <div className="relative h-10 w-72 mt-6 ml-8 min-w-[200px]">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">-Select-</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="tech">Tech</option>
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Category
          </label>
        </div>

        {userPosts ? (
          <div>
            <IconButton
              aria-label="megamenu"
              onClick={() => navigate("/megamenu")}
            >
              <AddIcon />
            </IconButton>

            <div className="grid grid-cols-4 mt-10 grid-row-2 gap-2">
              {userPosts.map((values, index) => (
                <div className="ml-2 mb-96" key={values.id}>
                  <Link to={`/blog/${values.id}`} className="link-style">
                    <BlogCard
                      className=""
                      index={index + 1}
                      username={values.username}
                      category={values.category}
                      title={values.title}
                      date={values.date}
                      image={values.image}
                      handleEdit={() => handleEdit(values.id)} 
                      // showEditButton={!values.isLink} // Only show edit button if the post is not a link
                    />
                  </Link>
                  <div></div>
                  {!values.isLink && (
                    <>
                      <div className='text-black space-x-60 '>
                        <button onClick={() => handleDelete(values.id)}>
                          <DeleteIcon/>
                        </button>
                        <button onClick={() => handleEdit(values.id)}>
                          <EditIcon/>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

<Dialog open={openDialog} onClose={handleCloseDialog}  >

  {openDialog && selectedPostId && (
    <MegamenuWithoutNavbar
      postId={selectedPostId}
      values={userPosts.find(post => post.id === selectedPostId)} 
      handleClose={handleCloseDialog}
    />
  )}
</Dialog>

      </div>
      <div className= 'flex justify-center mt-4'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mx-1 px-2 py-1 bg-gray-200 rounded-md">«</button>
        {renderPagination()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="mx-1 px-2 py-1 bg-gray-200 rounded-md">»</button>
      </div> 
    </>
  );
}

export default Dashboard;
