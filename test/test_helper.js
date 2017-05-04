const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

before((done)=>{
    mongoose.connect('mongodb://localhost:27017/users_test');
    mongoose.connection
        .once('open',()=> {
            done();
        })
        .on('error',(error)=>{
            console.warm('warm',error);
    });
});



beforeEach((done)=>{
    const {users, comments,blogposts}= mongoose.connection.collections;
    /*mongoose.connection.collections.users.drop(()=>{
        //Ready to run the next test
        done();
    });*/
    users.drop(()=>{
        users.drop(()=>{
            comments.drop(()=>{
                blogposts.drop(()=>{
                    done();
                });
            });
        });
    });
});