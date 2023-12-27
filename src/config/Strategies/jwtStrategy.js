import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserById } from "../../services/userService.js";

const cookieExtractor =(req)=>{
    const bearerToken=req.headers.authorization || null;
    const cookieJwt=req.cookies.jwt || null
    let token=null;
    if(bearerToken){
        token=bearerToken.slice(7)
    }else if(cookieJwt){
        token=cookieJwt
    }
    return token
}

const jwtOpts ={
    jwtFromRequest : ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "coder1234"
}

export const strategyJWT = new JwtStrategy(jwtOpts, async (payload, done)=>{
    try{
        const user = await findUserById(payload.user.id)
        if(!user){
            return done(null,false)
        }
        return done(null,user)
    }catch(error){
        return(error, false)
    }
})