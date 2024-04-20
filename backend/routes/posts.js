// backend/routes/posts.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Pool } = require('pg');
const config = require('../config/config');
const sharp = require('sharp'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

const pool = new Pool({
    user: config.db.username,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port:5432,
});

// POST /api/posts
router.post('/', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the file path
  
    // Validate content field
    if (!content) {
      return res.status(400).json({ message: 'Content cannot be empty' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO posts (title, content, image_path, time) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [title || null, content, imagePath]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM posts');

      const posts = await Promise.all(result.rows.map(async post => {
        if (post.image_path) {
            const resizedImageBuffer = await sharp(post.image_path)
            .resize({ width: 200, height: 200 , fit: 'inside', rotate: false}) // Set desired width and height
            .toBuffer();
            post.resized_image = resizedImageBuffer.toString('base64'); // Convert buffer to base64 string
        }
      return post;
      }));
      res.json(posts);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
