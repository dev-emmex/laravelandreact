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
    api.get("/user")
      .then(res => {
        if (res.data?.user?.name) setName(res.data.user.name);
      })
      .catch(() => {});
  }, []);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post? This action cannot be undone.')) return;
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'published': return 'pm-status-published';
      case 'draft':     return 'pm-status-draft';
      case 'archived':  return 'pm-status-archived';
      default:          return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return 'bi-check-circle-fill';
      case 'draft':     return 'bi-pencil-fill';
      case 'archived':  return 'bi-archive-fill';
      default:          return 'bi-circle';
    }
  };

  const published = posts.filter(p => p.status === 'published').length;
  const drafts    = posts.filter(p => p.status === 'draft').length;
  const archived  = posts.filter(p => p.status === 'archived').length;

  return (
    <div className="dashboard-page">
      <Nav name={name} setName={setName} />

      <div className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>
            <i className="bi bi-grid-3x3-gap-fill" style={{color:'var(--primary-light)'}}></i>
            {name
              ? <><span className="gradient-text">Hey, {name}!</span></>
              : 'Dashboard'
            }
          </h1>
          <p>Manage and publish your content from one place.</p>
        </div>

        {/* Stats row */}
        <div className="stats-grid">
          <div className="stat-card" style={{animationDelay:'0s'}}>
            <div className="stat-icon stat-icon-purple">
              <i className="bi bi-file-earmark-text"></i>
            </div>
            <div>
              <div className="stat-value">{posts.length}</div>
              <div className="stat-label">Total Posts</div>
            </div>
          </div>
          <div className="stat-card" style={{animationDelay:'0.05s'}}>
            <div className="stat-icon stat-icon-green">
              <i className="bi bi-check-circle"></i>
            </div>
            <div>
              <div className="stat-value">{published}</div>
              <div className="stat-label">Published</div>
            </div>
          </div>
          <div className="stat-card" style={{animationDelay:'0.1s'}}>
            <div className="stat-icon stat-icon-yellow">
              <i className="bi bi-pencil"></i>
            </div>
            <div>
              <div className="stat-value">{drafts}</div>
              <div className="stat-label">Drafts</div>
            </div>
          </div>
          <div className="stat-card" style={{animationDelay:'0.15s'}}>
            <div className="stat-icon stat-icon-gray">
              <i className="bi bi-archive"></i>
            </div>
            <div>
              <div className="stat-value">{archived}</div>
              <div className="stat-label">Archived</div>
            </div>
          </div>
        </div>

        {/* Posts table */}
        <div className="table-card">
          <div className="table-card-header">
            <h2>
              <i className="bi bi-list-ul"></i>
              All Posts
            </h2>
            <Link to="/create-new-post" className="btn-create">
              <i className="bi bi-plus-lg"></i>
              New Post
            </Link>
          </div>

          {error && (
            <div className="alert-premium" style={{margin:'16px 24px'}}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          <div className="pm-posts-list">
            <div className="pm-list-header">
              <div>Title</div>
              <div>Author</div>
              <div>Category</div>
              <div>Status</div>
              <div>Date</div>
              <div style={{textAlign:'right'}}>Actions</div>
            </div>

            {loading ? (
              <div className="table-loading">
                <div className="spinner-glow"></div>
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="table-empty">
                <i className="bi bi-inbox"></i>
                <p>No posts yet. Click <strong>New Post</strong> to create your first one!</p>
              </div>
            ) : (
              posts.map((post, i) => (
                <div
                  className="pm-list-item"
                  key={post.id}
                  style={{animationDelay:`${i * 0.04}s`}}
                >
                  <div className="pm-col pm-col-title">{post.title}</div>
                  <div className="pm-col pm-col-author">{post.author}</div>
                  <div className="pm-col">
                    <span className="pm-post-category">{post.category}</span>
                  </div>
                  <div className="pm-col">
                    <span className={`pm-status ${getStatusClass(post.status)}`}>
                      <i className={`bi ${getStatusIcon(post.status)}`}></i>
                      {post.status}
                    </span>
                  </div>
                  <div className="pm-col pm-col-date">{formatDate(post.created_at)}</div>
                  <div className="pm-col pm-col-actions">
                    <Link
                      to={`/edit-post/${post.id}`}
                      className="pm-icon-btn pm-btn-edit"
                      title="Edit post"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="pm-icon-btn pm-btn-delete"
                      onClick={() => handleDelete(post.id)}
                      title="Delete post"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
