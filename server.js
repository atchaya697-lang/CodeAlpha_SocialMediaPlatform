const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/socialmedia')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Social Media Server Running');
});

app.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user){
        res.send('Login Successful');
    }
    else{
        res.send('Invalid Email or Password');
    }

});
app.post('/posts', async (req, res) => {

    const newPost = new Post({
        userName: req.body.userName,
        content: req.body.content,
        likes: 0
    });

    await newPost.save();

    res.send('Post Created');

});
app.get('/posts', async (req, res) => {

    const posts = await Post.find();

    res.json(posts);

});
app.post('/comments', async (req, res) => {

    const newComment = new Comment({
        postId: req.body.postId,
        userName: req.body.userName,
        comment: req.body.comment
    });

    await newComment.save();

    res.send('Comment Added');

});
app.put('/like/:id', async (req, res) => {

    const post = await Post.findById(req.params.id);

    post.likes = post.likes + 1;

    await post.save();

    res.send('Post Liked');

});
app.post('/register', async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        followers: 0,
        following: 0
    });

    await newUser.save();

    res.send('User Registered');

});
app.put('/follow/:id', async (req, res) => {

    const user = await User.findById(req.params.id);

    if(!user.followers){
        user.followers = 0;
    }

    user.followers = user.followers + 1;

    await user.save();

    res.send('User Followed');

});
app.get('/users', async (req, res) => {

    const users = await User.find();

    res.json(users);

});

app.listen(3000, () => {
    console.log('Server Started');
});