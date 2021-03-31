const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();


//blog routes
router.get('/', (req, res)=>{
    Blog.find().sort({ creatdAt: -1})
        .then((result)=>{
            res.render('index', {title:'모든 콘텐츠', blogs: result})
        })
        .catch((err)=>{
            console.log(err)
        })   
})

router.post('/', (req, res)=>{
    const blog = new Blog(req.body);
    
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.get('/create', function(req, res){
    res.render('create', { title : 'Create a new blog'});
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {blog: result, title:'콘텐츠 상세'})
        })
        .catch((err)=>{
            res.status(404).render('404',{ title: "요청하신 페이지를 찾을 수 없습니다."})
        })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs' })
        }) 
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router;