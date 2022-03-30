function checkRole(role){
    console.log('admin');
    return (req,res,next)=>{
        console.log(req.body);
        if (req.user.role !== role){
            res.status(401)
            return res.send('Not allowed')
        }
        next()
    }
}

function checkRole2(role){
    console.log("admin")
    return (req, res, next) => {
        if(req.user.role !== role){
            
        }
    }
}
module.exports = {checkRole};