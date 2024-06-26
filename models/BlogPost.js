const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title.']
    },
    body: {
        type: String,
        required: [true, 'Please enter a description.']
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: { /* can declare property type with an object like this because we need 'default' */ 
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: [true, 'Please add a photo header for your post.']
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost