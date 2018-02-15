const Vote = require('./VoteModel')

class VoteData{
    listVotes(){
        return new Promise((resolve, reject) => {
            Vote.find({})
                .then(resolve)
                .catch(reject)
        })  
    }
    addVote(name, vote1, vote2, vote3){
        return new Promise((resolve, reject) => {
            if (!name)
                throw new Error('no name provided')

            if (!vote1)
                throw new Error('no vote1 provided')

            if (!vote2)
                throw new Error('no vote2 provided')

            if (!vote3)
                throw new Error('no vote3 provided')
            
            const vote = new Vote({ name, vote1, vote2, vote3 })

            vote.save()
                .then(resolve)
                .catch(reject)
        })  
    }
    resetVotes(){
        return new Promise((resolve, reject) => {
            Vote.remove({})
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = VoteData