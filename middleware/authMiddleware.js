import jwt from "jsonwebtoken";

const checkAuth = async(req , res , next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(401).json({
                error:"No token is provided"
            });
        }
        const decodedUser = jwt.verify(token , process.env.JWT_TOKEN);

        req.user = decodedUser;
        next();
    }
    catch(e){
                console.error("Something went wrong due to ", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default checkAuth;