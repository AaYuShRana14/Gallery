const jwt=require('jsonwebtoken');
const secret="isdjdsodefrk545";
module.exports=authenticateJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,secret,(err,payload)=>{
            if(err){
                return res.sendStatus(403);
            }
            if(!payload){
                return res.sendStatus(403);
            }
            req.user=payload;
            next();
        })
    }
    else{
        res.sendStatus(401);
    }
}