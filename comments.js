// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

// Get all comments by post id
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create new comment
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get comments array for post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add new comment to array
    comments.push({ id: commentId, content });

    // Update comments array for post id
    commentsByPostId[req.params.id] = comments;

    // Send comment
    res.status(201).send(comments);
});

// Start web server
app.listen(4001, () => {
    console.log('Listening on 4001');
});