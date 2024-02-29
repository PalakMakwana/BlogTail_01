import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit'; 

const BlogCardContainer = styled(Card)(({ theme }) => ({
  width: 300, 
  minHeight: 400, 
  display: 'flex',
  flexDirection: 'column',
}));


const Blogcard = ({ category,username,date, title, image, handleEdit, showEditButton }) => {
 

 


// const current = new Date();
// const date= `${current.getDate}/${current.getMonth}/${current.getFullYear}`
  return (
    <BlogCardContainer sx={{ borderRadius: '13px' }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
        //     {name && name.charAt(0).toUpperCase()}
        //   </Avatar>
        // }
        // title={title}
      subheader={`Posted by ${username} `}
     
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="194" image={image} alt={title} style={{ maxHeight: '300px', objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography>
          {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        


        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        {showEditButton && (
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </CardActions>
    </BlogCardContainer>
  );
};

export default Blogcard;
