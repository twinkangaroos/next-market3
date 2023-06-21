import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const verify = async(req, res) => {
    try{
        const token = req.body.token
        
        const decoded = jwt.verify(token, secret_key)
        return res.status(200).json({message: "verify成功", decoded: decoded})
    }catch(err){
        console.log(err)
        return res.status(200).json({message: "verify失敗"})
    }
}

export default verify