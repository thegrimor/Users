const assert = require ('assert');
const User = require ('../src/user');

describe('Subdocuments',()=>{
    it('can create a subdocument',(done)=>{
        const joe = new User ({
            name:'Joe',
            posts:[{title:'Postitle'}]
        });
        joe.save()
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.posts[0].title ==='Postitle');
                done();
            });
    });
    it('can create a subdocument',(done)=>{
        const joe = new User({
            name:'Joe',
            posts:[]
        });
         joe.save()
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                user.posts.push({title:'new Post'});
                return user.save();
            })
           .then(()=>User.findOne({name:'Joe'}))
           .then((user)=>{
                assert(user.posts[0].title ==='new Post');
                done();
           });
    });

    it('can remove a existing subdocument',(done)=>{
        const joe = new User ({
            name:'Joe',
            posts:[{title:'New Title'}]
        });
        joe.save()
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(()=> User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.posts.length === 0);
                done();
            });
    });

});