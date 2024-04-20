const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Pool } = require('pg');
const config = require('../config/config');
const sharp = require('sharp'); 

const pool = new Pool({
    user: config.db.username,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port:5432,
});

router.get('/', async (req, res) => {
    try {

      const result = await pool.query('SELECT * FROM posts WHERE date(time) = $1', [req.query.timestamp]);

      const posts = await Promise.all(result.rows.map(async post => {
        if (post.image_path) {
            const resizedImageBuffer = await sharp(post.image_path)
            .resize({ width: 200, height: 200 , fit: 'inside', rotate: false }) // Set desired width and height
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