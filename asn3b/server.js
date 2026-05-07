const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);


// CREATE
app.post('/add', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User Added");
});


// READ
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// UPDATE
app.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("User Updated");
});


// DELETE
app.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
});


app.listen(3000, () => {
    console.log("Server Started");
});