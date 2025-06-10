import bycrpt from "bycrpt" ;
import User from "../model/user";


const userSignUp = async(req , res)=>{
    try{ 
        const hashcode = await bcrypt.hash(req.body.password , 10);
        
    }
    catch(e){

    }
}