const jwt = require("jsonwebtoken")


const {redisClient} = require("../config/redis")

const authentication = async(req,res,next)=>{

    let token = await redisClient.get("token");
    console.log(token);

    if(token){
        if(! await redisClient.xInfoGroups("blackListToken",token)){
            jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
                if(decoded){
                    req.body.userid = decoded.userid;
                    next()
                }
            })
        }else{
            res.send("Logg in first ")
        }
     
     }
}


module.exports = {
    authentication
}