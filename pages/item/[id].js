import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

const ReadSingleItem = (props) => {
    return (
        <div className="grid-containar-si">
            <Head><title>{props.singleItem.title}</title></Head>
            <div>
                <Image src={props.singleItem.image} width="750" height="500" alt="item-image" />
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>¥{props.singleItem.price}</h2>
                <hr />
                <p>{props.singleItem.description}</p>

                <div>
                    <Link legacyBehavior href={`/item/update/${props.singleItem._id}`}><a>アイテム編集</a></Link>
                    <Link legacyBehavior href={`/item/delete/${props.singleItem._id}`}><a>アイテム削除</a></Link>
                </div>
              </div>
        </div>
        
    )
}

export default ReadSingleItem

export const getServerSideProps = async(context) => {
    const response = await fetch(`https://main.d3o6bbjtbofkju.amplifyapp.com/api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}