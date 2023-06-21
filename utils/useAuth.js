import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const secret_key = "nextmarket"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const router = useRouter()

    // ページ表示前に行いたい処理
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token")
            
            if (!token) {
                router.push("/user/login")
            }

            try {
                const response = await fetch("https://main.d3o6bbjtbofkju.amplifyapp.com/api/user/verify", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: token
                    })
                })
                const jsonData = await response.json()
                const decoded = jsonData.decoded
                setLoginUser(decoded.email)
            } catch (err) {
                console.log(err)
                router.push("/user/login")
            }
        }
        fetchData()
    }, [router])
    
    return loginUser
}

export default useAuth

/**
 useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/user/login")
        }
        try {
            const decoded = jwt.verify(token, secret_key)
            setLoginUser(decoded.email)
        } catch (err) {
            router.push("/user/login")
        }
    }, [router])

TypeError: Right-hand side of 'instanceof' is not an object
    at eval (verify.js:120:1)
    at getSecret (verify.js:97:1)
    at module.exports [as verify] (verify.js:101:1)
    at eval (VM8220 useAuth.js:25:81)
    at commitHookEffectListMount (react-dom.development.js:23150:1)
    at commitPassiveMountOnFiber (react-dom.development.js:24926:1)
    at commitPassiveMountEffects_complete (react-dom.development.js:24891:1)
    at commitPassiveMountEffects_begin (react-dom.development.js:24878:1)
    at commitPassiveMountEffects (react-dom.development.js:24866:1)
    at flushPassiveEffectsImpl (react-dom.development.js:27039:1)
    at flushPassiveEffects (react-dom.development.js:26984:1)
    at eval (react-dom.development.js:26769:1)
    at workLoop (scheduler.development.js:266:1)
    at flushWork (scheduler.development.js:239:1)
    at MessagePort.performWorkUntilDeadline (scheduler.development.js:533:1)
 */