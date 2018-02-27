const userData = new(require('./UserData'))
const Pin = require('../admin/pin')

class UserLogic{
    listUsers(){
        return userData.listUsers()
    }
    listUserNames(){
        return userData.listUserNames()
    }
    addUsers(users, pin){
        if(!Pin.checkPin(pin))
            throw new Error('Incorrect Pin')

        for(let i = 0; i<users.length; i++){
            const _name = users[i].name.toLowerCase()
            const _realname = users[i].realname.toLowerCase()
            userData.addUser(_name, _realname)
        }
        return new Promise((resolve,reject)=>{
            resolve('ok')
        })
    }
    changeVoteToTrue(name){
        const _name = name.toLowerCase()
        userData.changeVoteToTrue(_name)
    }
    resetVotes(){
        userData.resetVotes()
    }
    deleteUsers(pin){
        if(!Pin.checkPin(pin))
            throw new Error('Incorrect Pin')
            
        return userData.deleteUsers()
    }
}

module.exports = UserLogic