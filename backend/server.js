const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./utils/database');
const postsRouter = require('./routes/posts');
const postRouterTs = require('./routes/postsTS');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts',postsRouter);
app.use('/api/postsTs',postRouterTs);
app.use('/uploads', express.static('uploads'));


sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
