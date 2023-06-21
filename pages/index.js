import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) => {
  return (
    <div>
      <div>
      <Head><title>Next Market</title></Head>
      <div className="grid-container-in"></div>
        {props.allItems.map(item =>
          <Link legacyBehavior href={`/item/${item._id}`} key={item._id}>
            <a className="card">
              <Image src={item.image} width="750" height="500" alt="item-image" />
              <div className="text-area">
                <h2>¥{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0, 80)}...</p>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ReadAllItems

export const getServerSideProps = async() => {
  const response = await fetch("https://main.d3o6bbjtbofkju.amplifyapp.com/api/item/readall")
  const allItems = await response.json()
  // propsに収められて、const ReadAllItems = () => {..へ渡される
  return {
    props:allItems
  }
}