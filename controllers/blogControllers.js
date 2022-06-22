const Blog = require('../models/blog');

const blog_index = (req, res)=>{
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const blog_create_post = (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then(res.redirect('/blogs'))
        .catch((err) => {
            console.log(err.message);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: '404' });
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create' });
};

module.exports = {
    blog_index,
    blog_create_post,
    blog_delete,
    blog_details,
    blog_create_get,
}