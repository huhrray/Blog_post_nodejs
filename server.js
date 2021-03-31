const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes= require('./routes/blogRoutes');

const app = express();

// connection to mongodb
const dbURI='mongodb+srv://huh:gjtpdus93@nodejs-projects.ewb3v.mongodb.net/nodejs_projects?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

// register view engine 
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', function(req, res){
   res.redirect('/blogs')
}); 

app.get('/about', function(req, res){
    res.render('about', { title : 'About'});
});
//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title : '404'}); 
});




// server.listen(3000, 'localhost', ()=>{
//     console.log('listening for requests on port 3000')
// })