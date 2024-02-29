import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase1";
import { Grid, Typography, Button } from '@mui/material'; // Import Material-UI components

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

  const words = blogData.description.split(' ');
  const displayedDescription = showFullDescription ? blogData.description : words.slice(0, 10).join(' ');
  const readMoreButton = words.length > 10 ? (
    <Button className='text-[#1e2f97] hover:text-[#26b170] w-24' onClick={viewDescription}>
      {showFullDescription ? 'Read Less' : 'Read More'}
    </Button>
  ) : null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <img src={blogData.image} className='text-black h-full flex rounded-lg' alt="Blog" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom>Category: {blogData.category}</Typography>
        <Typography variant="h5" gutterBottom>Title: {blogData.title}</Typography>
        <Typography variant="body1" gutterBottom>{displayedDescription}</Typography>
        {readMoreButton}
        <Typography variant="body2">Date: {blogData.date}</Typography>
      </Grid>
    </Grid>
  );
}

export default BlogDetail;
