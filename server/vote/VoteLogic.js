const voteData = new(require('./VoteData'))

class VoteLogic{
    listVotes(){
        return voteData.listVotes()
    }
    
    addVote(name, vote1, vote2, vote3){
        const _name = name.toLowerCase()
        const _vote1 = vote1.toLowerCase()
        const _vote2 = vote2.toLowerCase()
        const _vote3 = vote3.toLowerCase()
        return voteData.addVote(_name, _vote1, _vote2, _vote3)
    }
}

module.exports = VoteLogic