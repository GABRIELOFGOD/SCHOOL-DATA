const jwt = require('jsonwebtoken')


const forAdmin = async (req, res, next) => {
    const schToken = req.headers.cookie
    if(schToken){
        const tokenName = schToken.split('=')[0]
        const tokenValue = schToken.split('=')[1]
        if(tokenName !== 'schToken'){
            return (res.status(401).json({errors: 'You are not allowed to perform this operation'}))
        }
        const ours = jwt.verify(tokenValue, process.env.JWT_TOKEN, (err, decodedToken) => {
            if(err){
                res.status(401).json({errors: 'You are not allowed to perform this operation'})
            }else{
                req.user = decodedToken
                next()
            }
        })
    }else{
        res.status(401).json({errors: 'You are not allowed to perform this operation'})
    }
}

const adminAccess = (req, res, next) => {
    const theCook = req.headers.cookie
    if(theCook){
        const cookieName = theCook.split('=')[0]
        const cookieValue = theCook.split('=')[1]
        
        if(cookieName !== 'schToken'){
            return(res.status(401).json({errors: 'access denied'}))
        }
        jwt.verify(cookieValue, process.env.JWT_TOKEN, (err, decodedToken) => {
            if(err){
                res.status(401).json({errors: 'access denied'})
            }else{
                console.log(decodedToken)
            }
        })
    }else{
        res.status(401).json({errors: 'Access denied'})
    }
}


module.exports = { forAdmin, adminAccess }