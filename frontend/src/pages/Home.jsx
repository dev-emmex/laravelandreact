
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Nav from '../components/Nav.jsx';
import { getPosts, deletePost } from '../api/api.js';

export default function Home() {
  
  const [name, setName] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user info using centralized API
    api.get("/user")
      .then(res => {
        // AuthController returns { user: { id, name, email } }
        if (res.data && res.data.user && res.data.user.name) {
          setName(res.data.user.name);
        }
      })
      .catch(() => {
        // Auth handled by AuthGuard, ignore errors here
      });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      // Show validation error message from backend
      const message = err.response?.data?.message || 'Failed to load posts';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete post
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        // Remove deleted post from UI
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post');
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'published':
        return 'pm-status-published';
      case 'draft':
        return 'pm-status-draft';
      case 'archived':
        return 'pm-status-archived';
      default:
        return '';
    }
  };

  return (
    <div>
      <Nav name={name} setName={setName} />
      <div className="container">
        <div className="post-management-container">
          <header className="pm-header">
            <div className="pm-header-content">
              <h1>Post Management System</h1>
              <p className="pm-subtitle">Welcome{name ? ' ' + name : ''}! Create, edit, and manage your posts</p>
            </div>
          </header>

          <div className="pm-main" id="postsPage">
            <section className="pm-posts-section">
              <div className="pm-posts-header">
                <h2>All Posts</h2>
                <Link to="/create-new-post" className="pm-filters">
                  <button className="btn btn-primary" id="createPostBtn">+ Create New Post</button>
                </Link>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="pm-posts-list">
                <div className="pm-list-header">
                  <div className="pm-col pm-col-title">Title</div>
                  <div className="pm-col pm-col-author">Author</div>
                  <div className="pm-col pm-col-category">Category</div>
                  <div className="pm-col pm-col-status">Status</div>
                  <div className="pm-col pm-col-date">Date</div>
                  <div className="pm-col pm-col-actions">Actions</div>
                </div>

                {loading ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    Loading posts...
                  </div>
                ) : posts.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                    No posts found. Click "Create New Post" to add one!
                  </div>
                ) : (
                  posts.map((post) => (
                    <div className="pm-list-item" key={post.id}>
                      <div className="pm-col pm-col-title">{post.title}</div>
                      <div className="pm-col pm-col-author">{post.author}</div>
                      <div className="pm-col pm-col-category">
                        <span className="pm-post-category">{post.category}</span>
                      </div>
                      <div className="pm-col pm-col-status">
                        <span className={`pm-status ${getStatusClass(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="pm-col pm-col-date">
                        {formatDate(post.created_at)}
                      </div>
                      <div className="pm-col pm-col-actions">
                        <Link 
                          to={`/edit-post/${post.id}`}
                          className="pm-icon-btn pm-btn-edit"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button 
                          className="pm-icon-btn pm-btn-delete" 
                          onClick={() => handleDelete(post.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

