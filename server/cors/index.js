module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Request-Method', '*')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    //res.header('Access-Control-Allow-Headers', '*')
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
    if (req.method === 'OPTIONS') {
        res.writeHead(200)

        return res.end()
    }

    next()
}