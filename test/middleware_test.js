const mongooose = require('mongoose');
const assert = require('assert');
const User= require('../src/user');
const BlogPost=require('../src/blogPost');

describe('Middleware',()=>{
    let joe, blogPost, comment;
    beforeEach((done)=>{
        //instancia de 1 usuario
        joe = new User({
            name:'Joe'
        });
        //instancia de 1 blogpost
        blogPost = new BlogPost({
            title:'Js is Great',
            content:'yep,really is'
        });
        //instancia de 1 comentario
        

        joe.blogPost.push(blogPost);
       

        Promise.all([joe.save(),blogPost.save()])
            .then(()=>done());
    });

    it ('users clean up dangling blogpost on remove',(done)=>{
        joe.remove()
            .then(()=>BlogPost.count())
            .then((count)=>{
                assert(count===0);
                done();
            })
    });

});