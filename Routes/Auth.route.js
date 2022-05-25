const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const User = require('../Models/User.model')
const { authSchema } = require('../helpers/validationschema')
const{ checkRole,signAccessToken, signRrefeshToken,verifyRefreshToken, verifyAccessToken} = require('../helpers/jwthelper')
const bcrypt = require('bcrypt');

router.post('/register', async(req,res,next)=>{
    try{
        const result = await authSchema.validateAsync(req.body) // validate data type of every attribute in  user table
    
        const doesExist = await User.findOne({ email:result.email})
        if(doesExist) throw createError.Conflict('${result.email} is already been registered')

        const user = new User({
            username:req.body.username,
            password:req.body.password,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            address:req.body.address,
            role:req.body.role,
            status:"Active",
            R_ID: req.body.R_ID
         })

        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRrefeshToken(savedUser.id)
        res.send({accessToken,refreshToken})

    }catch(error){
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async(req,res,next)=>{
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})
        if(!user) throw createError.NotFound('User not registered') 
        if(user.status == "InActive") throw createError.NotFound('User has been Deleted') 

        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRrefeshToken(user.id)
        
        res.send({ accessToken,refreshToken,role:user.role})

    } catch (error) {
        if(error.isJoi === true) 
            return next(createError.BadRequest("Invalid Username/Password"))
        next(error)
    }
})

router.post('/refresh-token', async(req,res,next)=>{
    try {
        const {refreshToken }= req.body
        if(!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        
        const accessToken = await signAccessToken(userId)
        const refToken = await signRrefeshToken(userId)
        res.send({accessToken: accessToken,refreshToken: refToken})

    } catch (error) {
        next(error)
        
    }
})

router.get('/userprofile',verifyAccessToken,async(req,res,next)=>{
    User.findById(req.payload.aud)
    .then(result=>{
        res.status(200).json({
            email:result.email,
            username:result.username,
            phoneNumber:result.phoneNumber,
            address:result.address,
            R_ID: result.R_ID

        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.put('/:id',verifyAccessToken,async(req,res,next)=>{
    const result = await authSchema.validateAsync(req.body) // validate data type of every attribute in  user table
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else {
            User.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    
                        username:req.body.username,
                        password:hash,
                        phoneNumber:req.body.phoneNumber,
                        email:req.body.email,
                        address:req.body.address
                                   
                }
            })
                .then(result => {
                    res.status(200).json({
                        updated_User: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
        
 })
        }
        
    })

})

// Read Users
router.get('/', verifyAccessToken,  checkRole,(req, res, next) => {

User.findById(req.payload.aud)
.then(result => {

    User.find({R_ID: result.R_ID}) 
    .exec()
    .then(result => {
        res.status(200).json({
            Users: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

});


router.delete('/:id',verifyAccessToken,async(req,res,next)=>{
       
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            status:"InActive"
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    
})
})

router.delete('/logout', async(req,res,next)=>{
    try {
        const {refreshToken} = req.body
        if(!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
    } catch (error) {
        next(error)
    }
})

module.exports = router