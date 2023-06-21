import jwt from "jsonwebtoken"
const secret_key = "nextmarket"

const auth = (handler) => {
    return async(req, res) => {
        if (req.method === "GET") {
            return handler(req, res)
        }
        //　ヘッダのauthorizationからtokenを取得する。
        const token = await req.headers.authorization.split(" ")[1]
        
        if (!token) {
            return res.status(401).json({message: "トークンがありません"})
        }

        try {
            const decode = jwt.verify(token, secret_key)
            // トークンのメールアドレスをレスポンスbodyにセットする。
            req.body.email = decode.email
            return handler(req, res)
        } catch(err) {
            console.log(err)
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
        }
    }
}

export default auth