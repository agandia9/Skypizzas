const voteData = new(require('./VoteData'))
const userLogic = new(require('../user/UserLogic'))

class VoteLogic{
    listVotes(){
        return voteData.listVotes().then(res =>countPizzas(filterVotes(res)))
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
    resetVotes(){
        return voteData.resetVotes()
    }
}
function checkUserAndVote(name){
    return userLogic.listUsers()
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