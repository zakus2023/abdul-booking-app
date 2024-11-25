import jwt from 'jsonwebtoken'


const validUser = (req,res,next)=>{
try {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    const decreptedObj = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decreptedObj
    next()
} catch (error) {
    res.status(401).json({message:"Invalid token"})
}
}

export default validUser