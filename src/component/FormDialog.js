// FormDialog.js
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


export default function FormDialog({ open, handleClose, editPostData }) {
  const [formData, setFormData] = useState({});



  useEffect(() => {
    if (editPostData) {
      setFormData(editPostData);
    }
  }, [editPostData]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    
      handleClose();
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
         
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="category"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
             <TextField
            required
            margin="dense"
            id="category"
            name="category"
            label="Description"
            type="textarea"
            fullWidth
            variant="standard"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            value={formData.date || ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          
          <TextField
            required
            margin="dense"
            id="image"
            name="image"
            label="Image URL"
            type="file"
            fullWidth
            variant="standard"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />


          </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}
