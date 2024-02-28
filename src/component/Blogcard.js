import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';



const BlogCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Blogcard = ({ category, title, date, image, handleDelete, handleEdit, showDeleteButton, showEditButton }) => {
  
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick=()=>{
    setExpanded(!expanded);
  };
  console.log(handleEdit, "a")

  return (
    <BlogCardContainer  sx={{  borderRadius: '13px' }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          
        </ExpandMore>
      </CardActions>
     
    </BlogCardContainer>
  );
};

export default Blogcard;
