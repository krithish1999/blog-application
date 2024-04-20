// frontend/src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {

      const token = localStorage.getItem('token'); // Retrieve authentication token from local storage
      if (!token) {
        throw new Error('User not authenticated');
      }

      await axios.post('http://localhost:5001/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully');
      // Clear form fields
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} 
           rows={12}
           cols={50}/>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
