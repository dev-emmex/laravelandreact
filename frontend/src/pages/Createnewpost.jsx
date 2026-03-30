import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../api/api.js';
import '../assets/style.css';

export default function Createnewpost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', status: 'draft', content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await createPost(formData);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-topbar">
        <Link to="/home" className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Posts
        </Link>
        <span className="form-page-title">New Post</span>
      </div>

      <div className="form-main">
        <div className="form-card">
          <h2>
            <i className="bi bi-plus-square"></i>
            Create New Post
          </h2>

          {error && (
            <div className="alert-premium" style={{marginBottom:'20px'}}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter a compelling title..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="technology">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows="8"
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                {isSubmitting
                  ? <><i className="bi bi-arrow-repeat me-2" style={{display:'inline-block',animation:'spin 0.8s linear infinite'}}></i>Creating...</>
                  : <><i className="bi bi-check2 me-2"></i>Create Post</>
                }
              </button>
              <Link to="/home" className="btn-form-cancel">
                <i className="bi bi-x"></i>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
