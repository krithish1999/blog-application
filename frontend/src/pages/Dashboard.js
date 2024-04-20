import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
            const response = await axios.get('http://localhost:5001/api/posts');
            setPosts(response.data);
            } catch (error) {
            console.error('Error fetching posts:', error);
            }
        }
      fetchPosts();
    }, []);
  
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '20px' }}>
        <h2>Posts</h2>
        {posts.map((post, index) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.resized_image && (
            <img src={`data:image/jpeg;base64,${post.resized_image}`} alt="Resized Image" />
          )}
            <hr />
          </div>
        ))}
      </div>
    );
  
}

export default Dashboard;
