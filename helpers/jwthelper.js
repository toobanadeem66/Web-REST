const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const User = require('../Models/User.model')

module.exports = {
    signAccessToken: (userId) =>{
        return new Promise((resolve,reject)=>{
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
<<<<<<< HEAD
                expiresIn :'1hr',
=======
                expiresIn :'20min',
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
                issuer: 'pickurpage.com',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err,token)=> {
                if(err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                //reject(err)
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req,res,next) => {
        if(!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        const verify = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, payload) =>{
            if(err){
                
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            
            req.payload = payload
           //console.log(req.payload);
            next()
        })
    },
    signRrefeshToken: (userId) =>{
        return new Promise((resolve,reject)=>{
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn :'1y',
                issuer: 'pickurpage.com',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err,token)=> {
                if(err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve,reject)=> {
            JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
                if (err) return reject(createError.Unauthorized())
                const userId = payload.aud

                resolve(userId)
            })   
        })
    },
    checkRole: (req,res,next) => {
        User.findById(req.payload.aud)
        .then(result=>{
            //console.log(result.role)
            if(result.role!=='admin') {
                res.status(401)
                    return res.send('UnAuthorized')
            }
           next()
        })
        
        
    }


}