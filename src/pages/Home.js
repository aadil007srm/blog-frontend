// Home.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Changed useHistory to useNavigate
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages

  const navigate = useNavigate(); // For redirecting after logout
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get('https://blog-be-qibp.onrender.com/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        setPosts(response.data); // Set the fetched posts to state
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again.'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array to run once on mount

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      await axios.delete(`https://blog-be-qibp.onrender.com/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      // Provide a more informative error message
      const message = error.response?.data?.message || 'Failed to delete post. Please try again.';
      setError(message); // Set error message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to home or login page
  };

  if (loading) {
    return <CircularProgress />; // Show loading spinner
  }

  if (error) {
    return <Alert severity="error" align="center">{error}</Alert>; // Show error message
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}> {/* Use post._id for unique key */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                  {isAuthenticated && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(post._id)} // Call delete function
                      sx={{ mt: 2 }}
                    >
                      Delete Post
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {isAuthenticated && (
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/create-post" 
          sx={{ mt: 4 }}
        >
          Create Post
        </Button>
      )}

      {isAuthenticated && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 4, ml: 2 }}
        >
          Logout
        </Button>
      )}
    </Container>
  );
};

export default Home;
