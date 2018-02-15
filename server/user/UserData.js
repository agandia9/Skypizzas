const User = require('./UserModel')

class UserData{
    listUsers(){
        return new Promise((resolve,reject)=>{
            User.find({},'-_id')
                .then(resolve)
                .catch(reject)
        })
    }
    addUser(name){
        return new Promise((resolve,reject)=>{
            if(!name)
            throw new Error('no name provided')

        const user = new User({name})

        user.save()
            .then(resolve)
            .catch(reject)
        })
    }
    changeVoteToTrue(name){
        return new Promise((resolve,reject)=>{
            if(!name)
            throw new Error('no name provided')

            User.update({name},{voted:true})
                .then(resolve)
                .catch(reject)
        })
    }
    resetVotes(){
        return new Promise((resolve,reject)=>{

            User.update({},{voted:false},{multi: true})
                .then(resolve)
                .catch(reject)
        })
    }
}
module.exports = UserData