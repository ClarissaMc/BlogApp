const BlogPost = require('../models/BlogPost.js')   // import Blog Post model

module.exports = async (req, res) =>{
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    res.render('post', {
        blogpost
    });
}