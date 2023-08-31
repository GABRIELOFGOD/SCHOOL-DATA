const jwt = require('jsonwebtoken')

const forAdmin = async (req, res, next) => {
    const {cookie} = req.headers
    if(cookie){
        const isAdmin = cookie.split('=')[0]
        const token = cookie.split('=')[1]

        if(isAdmin == 'isAdmin'){
            // ======= Verifying token ========= //
            jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken)=>{
                if(err){
                    res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})
                }
                else{
                    req.user = decodedToken
                    next()
                }
            })
        }else{
            res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})
        }
    }else{
        res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})

    }
}

module.exports = { forAdmin }