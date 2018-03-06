const voteData = new(require('./VoteData'))
const userLogic = new(require('../user/UserLogic'))
const pizzasLogic = new(require('../pizzas/PizzasLogic'))
const Pin = require('../admin/pin')

const oldPizzas = {

}

class VoteLogic{
    listActualVotes(){
        return voteData.listActualVotes().then(res =>countPizzas(filterVotes(res)))
    }
    listOldVotes(){
        const agroupedPizzas = pizzasLogic.listOnlyNames()

        return voteData.listOldVotes().then(res =>filterVotesPerDate(res, agroupedPizzas))
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
function filterVotesPerDate(votes, agroupedPizzas){
    const filteredVotes = {}
    let actualDate = ""
    let groupVotesByWeek = []
    for(let i=0;i<votes.length; i++){
        if(actualDate !== votes[i].date.toString()){
            if(actualDate){
                groupVotesByWeek.push( countPizzas(filteredVotes[actualDate]))
            }
            actualDate = votes[i].date.toString()
            filteredVotes[actualDate]=[]
        }
        filteredVotes[actualDate].push(votes[i].vote1)
        filteredVotes[actualDate].push(votes[i].vote2)
        filteredVotes[actualDate].push(votes[i].vote3)
    }
    groupVotesByWeek.push(countPizzas(filteredVotes[actualDate]))
    return putVotesToReturn(groupVotesByWeek, agroupedPizzas)
}
function putVotesToReturn(weeks, agroupedPizzas){

    for(let i=0; i< weeks.length;i++){
        for(let j=0; j< Object.keys(weeks[i]).length;j++){
            let pizza = Object.keys(weeks[i])[j]
            let numberOfVotes = weeks[i][Object.keys(weeks[i])[j]]

            agroupedPizzas[pizza].push(numberOfVotes)
        }
        for(let j=0; j< Object.keys(agroupedPizzas).length;j++){
            let pizza = Object.keys(agroupedPizzas)[j]
            //console.log(agroupedPizzas[pizza][i])
            if(agroupedPizzas[pizza][i]===undefined){
                agroupedPizzas[pizza].push(0)
            }
        }
    }
    return agroupedPizzas
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