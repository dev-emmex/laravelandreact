import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/api.js';
import '../assets/style.css';

export default function Editpost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        status: 'draft',
        content: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Fetch post data on component mount
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const post = await getPost(id);
                setFormData({
                    title: post.title || '',
                    author: post.author || '',
                    category: post.category || '',
                    status: post.status || 'draft',
                    content: post.content || ''
                });
                setError('');
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post data');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await updatePost(id, formData);
            // Redirect to home page after successful update
            navigate('/home');
        } catch (err) {
            // Show validation error message from backend
            const message = err.response?.data?.message || 'Failed to update post. Please try again.';
            setError(message);
            console.error('Error updating post:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <div className="container">
                    <div className="post-management-container">
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            Loading post...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                <div className="post-management-container">
                    <header className="pm-header">
                        <div className="pm-header-content">
                            <h1>Post Management System</h1>
                            <p className="pm-subtitle">Create, edit, and manage your posts</p>
                        </div>
                    </header>

                    <div className="pm-main">
                        <section className="pm-form-section">
                            <div className="pm-form-card">
                                <div className="pm-form-header">
                                    <h2>Edit Post</h2>
                                    <Link to="/" className="btn-close" aria-label="Close">&times;</Link>
                                </div>
                                
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                
                                <form className="pm-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input 
                                            type="text" 
                                            id="title" 
                                            name="title" 
                                            placeholder="Enter post title" 
                                            value={formData.title}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author">Author</label>
                                        <input 
                                            type="text" 
                                            id="author" 
                                            name="author" 
                                            placeholder="Enter author name" 
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
                                            rows="6" 
                                            placeholder="Enter post content" 
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="form-actions">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Updating...' : 'Update Post'}
                                        </button>
                                        <Link to="/" className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

