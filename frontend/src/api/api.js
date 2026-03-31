import axios from "axios";

// Create axios instance with base URL - use relative path for Vite proxy
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add interceptors for handling tokens and errors
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();
    if (['post', 'put', 'delete', 'patch'].includes(method)) {
      const hasCsrf = document.cookie.split('; ').some(c => c.startsWith('XSRF-TOKEN='));
      if (!hasCsrf) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (unauthenticated)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear any local storage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Post API functions - matching Laravel backend routes

// Get all posts (if endpoint exists)
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get single post (if endpoint exists)
export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Create new post - matches Laravel route: POST /api/create-new-post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/create-new-post', postData);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Update post (if endpoint exists)
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete post (if endpoint exists)
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export default api;

