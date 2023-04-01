const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Array of posts
let posts = [
  {
    id: 1,
    title: 'First post',
    body: 'This is the first post'
  },
  {
    id: 2,
    title: 'Second post',
    body: 'This is the second post'
  }
];

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get a specific post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found.');
  res.json(post);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body
  };
  posts.push(post);
  res.json(post);
});

// Update an existing post
app.put('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found.');

  post.title = req.body.title;
  post.body = req.body.body;

  res.json(post);
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found.');

  const index = posts.indexOf(post);
  posts.splice(index, 1);

  res.json(post);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
