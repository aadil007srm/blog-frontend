import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: 4,
  padding: 4,
  borderRadius: 2,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required!');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://blog-be-qibp.onrender.com/api/posts',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post created:', response.data);
      setSuccess(true);
      setTitle('');
      setContent('');
      setError('');
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response) {
        setError(`Failed to create post: ${error.response.data.message || 'Please try again.'}`);
      } else {
        setError('Failed to create post. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess(false);
  };

  return (
    <Container maxWidth="sm">
      <StyledBox>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              error={!title && error}
              helperText={!title && error ? 'Title is required' : ''}
            />
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              error={!content && error}
              helperText={!content && error ? 'Content is required' : ''}
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </motion.div>
      </StyledBox>

      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Post created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePost;
