const voteData = new(require('./VoteData'))
const userLogic = new(require('../user/UserLogic'))
const Pin = require('../admin/pin')

class VoteLogic{
    listActualVotes(){
        return voteData.listActualVotes().then(res =>countPizzas(filterVotes(res)))
    }
    listOldVotes(){
        return voteData.listOldVotes().then(res =>filterVotesPerDate(res))
    }
    
    addVote(name, vote1, vote2, vote3){
        return checkUserAndVote(name)
            .then(res =>{
                if(res){
                    const _name = name.toLowerCase()
                    const _vote1 = vote1.toLowerCase()
                    const _vote2 = vote2.toLowerCase()
                    const _vote3 = vote3.toLowerCase()
                    userLogic.changeVoteToTrue(name)
                    return voteData.addVote(_name, _vote1, _vote2, _vote3)
                }else{
                    throw new Error('name invalid or this user has already voted!')
                }
            })
    }
    resetVotes(pin){
        if(!Pin.checkPin(pin))
            throw new Error('Incorrect Pin')

        userLogic.resetVotes()
        return voteData.addDates()
    }
}
function checkUserAndVote(name){
    return userLogic.listUserNames()
        .then(users=>(checkUser(users,name) && !checkVote(users,name)))
}

function checkUser(users,name){
    return users.some(user=> name.toLowerCase()===user.name)
}
function checkVote(users,name){
    const arrFiltered = users.filter(user=>name.toLowerCase()===user.name)
    return arrFiltered[0].voted
}
function filterVotes(votes){
    const filteredVotes = []
    for(let i=0;i<votes.length; i++){
        filteredVotes.push(votes[i].vote1)
        filteredVotes.push(votes[i].vote2)
        filteredVotes.push(votes[i].vote3)
    }
    return filteredVotes
}
function filterVotesPerDate(votes){
    const filteredVotes = {}
    let actualDate = ""
    for(let i=0;i<votes.length; i++){
        if(actualDate !== votes[i].date.toString()){
            if(actualDate){
                filteredVotes[actualDate] = countPizzas(filteredVotes[actualDate])
            }
            actualDate = votes[i].date.toString()
            filteredVotes[actualDate]=[]
        }
        filteredVotes[actualDate].push(votes[i].vote1)
        filteredVotes[actualDate].push(votes[i].vote2)
        filteredVotes[actualDate].push(votes[i].vote3)
    }
    filteredVotes[actualDate] = countPizzas(filteredVotes[actualDate])
    return filteredVotes
}
function countPizzas(pizzas) {
	var countedPizzas = {}
	for (var i = 0; i < pizzas.length; i++) {
		var count = 0
		for (var j = 0; j < pizzas.length; j++) {
			if (pizzas[i] === pizzas[j]) {
				count++
				countedPizzas[pizzas[i]] = count
			} else {
				countedPizzas[pizzas[i]] = count
			}
		}
	}
    return countedPizzas
}

module.exports = VoteLogic