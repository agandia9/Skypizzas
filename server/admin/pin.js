require('dotenv').config()

const pin = {
    checkPin: function(_pin){
        if(_pin === process.env.PIN){
            return true
        }
        return false
    }
}

module.exports = pin