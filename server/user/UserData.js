const User = require('./UserModel')

class UserData{
    listUsers(){
        return new Promise((resolve,reject)=>{
            User.find({})
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
}
module.exports = UserData