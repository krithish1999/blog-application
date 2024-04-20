import React, { useState } from 'react';
import axios from 'axios';

function TimestampPage() {
  const today = new Date().toISOString().slice(0, 16);
  const [timestamp, setTimestamp] = useState(today);
  const [posts, setPosts] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5001/api/postsTs', {
        params: { timestamp }
      });
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error retrieving timestamp data:', error);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, padding: '20px' }}>
      <h2>Select Date:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Timestamp:
          <input 
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {posts.length > 0 && (
        <div>
          <hr />
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
      )}
    </div>

    
  );
}

export default TimestampPage;
