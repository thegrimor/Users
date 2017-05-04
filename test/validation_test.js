const assert = require ('assert');
const User = require ('../src/user');

describe('Validating records',()=>{
    it('requires a user name',()=>{
        const user = new User({name:undefined});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message === 'pon el nombre !')
    });

    it('requires a user name longer than 2 characters',()=>{
        const user = new User({name:'al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message === 'El nombre debe ser mayor a 2 caracteres');
    });

    it('disallows invalid records from being saved',(done)=>{
        const user = new User({name:'Al'});
        user.save()
            .catch((validationResult)=>{
               const {message} = validationResult.errors.name;
               assert(message === 'El nombre debe ser mayor a 2 caracteres');
               done();
            });
    });
});