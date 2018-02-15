const userData = new(require('./UserData'))

class UserLogic{
    listUsers(){
        return userData.listUsers()
    }
    addUsers(names){
        for(let i = 0; i<names.length; i++){
            const _name = names[i].toLowerCase()
            userData.addUser(_name)
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
        return userData.resetVotes()
    }
}

module.exports = UserLogic