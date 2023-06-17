import jwt from "jsonwebtoken"
const secret_key = "nextmarket"

const auth = (handler) => {
    return async(req, res) => {
        if (req.method === "GET") {
            return handler(req, res)
        }
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3aW5rYW5nYXJvb3NAZ21haWwuY29tIiwiaWF0IjoxNjg3MDA4NTYxLCJleHAiOjE2ODcwOTEzNjF9.PJvJgX4z2NzCK-j4ev1ZljvKn4pWc5tKAVA6I0QsRDs" 
        //const token = await req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({message: "トークンがありません"})
        }

        try {
            const decode = jwt.verify(token, secret_key)
            // 画面上のメールアドレスではなく、トークンのメールアドレスを使うようにする。
            req.body.email = decode.email
            return handler(req, res)
        } catch(err) {
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
        }
    }
}

export default auth