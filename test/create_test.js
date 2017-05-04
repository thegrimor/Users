const assert = require ('assert');
const User = require ('../src/user');
describe('Creating records',()=>{
    it('saves a user',(done)=>{
        const joe = new User({
            name:'joe'
        });
        joe.save()
            .then(()=>{
                //has been saved successfully?
                assert(!joe.isNew);
                done();
            });
    });
});