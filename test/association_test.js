const mongoose = require('mongoose');
const assert = require('assert');
const User = require ('../src/user');
const Comment = require ('../src/comment');
const BlogPost = require ('../src/blogPost');

describe('Asociaciones',()=>{
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
        comment = new Comment({
            content:'congrat on great post'
        });

        joe.blogPost.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(),blogPost.save(),comment.save()])
            .then(()=>done());
    });

    it ('saves a relation between a user and a blogpost',(done)=>{
        User.findOne({name:'Joe'})
            .populate('blogPost')
            .then ((user)=>{
                assert(user.blogPost[0].title==='Js is Great');
                done();
            });
    });

    it ('saves a relation graph',(done)=>{
        User.findOne({name:'Joe'})
            .populate({
                path:'blogPost',
                populate:{
                    path:'comments',
                    model:'comment',
                    populate:{
                        path:'user',
                        model:'user'
                    }
                }
            })
            .then ((user)=>{
                assert(user.name==='Joe');
                assert(user.blogPost[0].title==='Js is Great');
                assert(user.blogPost[0].comments[0].content==='congrat on great post');
                assert(user.blogPost[0].comments[0].user.name==='Joe');
                done();
            });
    });
});
