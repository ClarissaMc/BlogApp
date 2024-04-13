const BlogPost = require('../models/BlogPost.js')   // import Blog Post model

// service pages when requested
// requires replacing href links in index.html
module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render('index', {   // looks in a 'views' folder for index.ejs
        blogposts           // this is the shorthand for blogposts: blogposts
    });                     // index.ejs now has access to blogposts variable
}