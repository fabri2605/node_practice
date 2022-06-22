const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//MongoDB
const dbURI =
    'mongodb+srv://lekoNode:mynode123@nodetut.1dbtc.mongodb.net/NodeTut?retryWrites=true&w=majority';
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err.message);
    });

//register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myViews');

//listen
app.listen(3000);

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//blog routes (mongoose and mongo sandbox)

app.use('/blogs',blogRoutes);

/* app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Wasabi bro',
        snippet: 'snippet w about 1',
        body: 'body w about 2',
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err.message);
        });
}); */
/* app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err.message);
        });
}); */
/* app.get('/single-blog', (req, res) => {
    Blog.findById('62a76ba44ce6ba2a1a81fbaf')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err.message);
        });
}); */

//404 at bottom allways
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
