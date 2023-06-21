import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://main.d3o6bbjtbofkju.amplifyapp.com/api/item/create", {
                method: "POST",
                // LocalStorageのtokenをヘッダに書き込む。
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (err) {
            alert("アイテム作成失敗")
        }
    }

    const loginUser = useAuth()
    
    if (loginUser) {
        return (
            <div>
                <Head><title>アイテム作成</title></Head>
                <h1 className="page-titel">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
    
}

export default CreateItem