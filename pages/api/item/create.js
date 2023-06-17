import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"

const createItem = async(req, res) => {
    try {
        await connectDB()
        await ItemModel.create(req.body)
        return res.status(200).json({message: "アイテム作成!"})
    }catch(err){
        return res.statsu(400).json({message: "アイテム作成失敗"})
    }
    
}

// アイテムデータの作成前にauth.jsが実行される
export default auth(createItem)