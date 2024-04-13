const BlogPost = require('../models/BlogPost.js')   // import Blog Post model
const path = require('path')

module.exports = (req, res) =>{
    try {
        let image = req.files.image;
        // mv moves the files somewhere else on server
        image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name), async (error) =>{
            // model creates a new doc with browser data
            await BlogPost.create({
                ...req.body,
                image: '/assets/img/' + image.name,
                userid: req.session.userId
            })
            .then(() =>{
                res.redirect('/')
            })
            .catch((error) =>{
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/posts/new')
            })
        })
    }
    catch (error) {
        const validationErrors = ["Please upload a header image for your blog post."]
        req.flash('validationErrors', validationErrors)
        req.flash('data', req.body)
        return res.redirect('/posts/new')
    }
}