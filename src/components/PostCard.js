import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'; // Import icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import icon

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '20px auto',
  transition: '0.3s',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: '12px', // Rounded corners
  boxShadow: `0 4px 12px ${theme.palette.grey[400]}`,
  '&:hover': {
    boxShadow: `0 8px 24px ${theme.palette.grey[600]}`,
  },
}));

function PostCard({ post, onDelete }) {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#3f51b5' }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1.5 }}>
          {post.body}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom sx={{ fontStyle: 'italic', color: '#757575' }}>
          By {post.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/edit-post/${post._id}`}>
          <Button size="small" color="secondary" variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
        </Link>
        <Button size="small" color="error" variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default PostCard;
