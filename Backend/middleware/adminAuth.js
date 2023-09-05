const jwt = require('jsonwebtoken')

const theAdmin = async (req, res, next) => {
    const {cookie} = req.headers
    const splitter = cookie.split(' ')
    splitter.forEach(element => {
        const isAdmin = element.split('=')[0]
        const token = element.split('=')[1]

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
    });
    // if(cookie){
    //     const isAdmin = cookie.split('=')[0]
    //     const token = cookie.split('=')[1]

    //     if(isAdmin == 'isAdmin'){
    //         // ======= Verifying token ========= //
    //         jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken)=>{
    //             if(err){
    //                 res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})
    //             }
    //             else{
    //                 req.user = decodedToken
    //                 next()
    //             }
    //         })
    //     }else{
    //         res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})
    //     }
    // }else{
    //     res.status(401).json({errors: 'sorry, you are not allowed to perform this Operation'})

    // }
}

const forAdmin = async (req, res, next) => {
    const isAdmin = req.headers.cookie
    if(isAdmin){
        const splitter = isAdmin.split(' ')
        splitter.map(cookie => {
            const cookieName = cookie.split('=')[0]
            const cookieValue = cookie.split('=')[1]
            if(cookieName == 'isAdmin'){
                return (
                    jwt.verify(cookieValue, process.env.JWT_TOKEN, (err, decodedToken)=>{
                        if(err){
                            res.status(401).json({errors: 'You are not allowed to perform this operation'})
                        }else{
                            req.user = decodedToken
                            next()
                        }
                    })
                )
            }
            else{
                return( res.status(401).json({errors: 'You are not allowed to perform this operation'}))
            }
        })
    }else{
        res.status(401).json({errors: 'Not Allowed'})
    }
}

module.exports = { forAdmin }