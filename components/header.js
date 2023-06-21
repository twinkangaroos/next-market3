import Link from "next/link"

const Header = () => {
    return(
        <header>
        <div><Link legacyBehavior href="/"><a><img src="/header.svg" /></a></Link></div>
            <nav>
                <ul>
                    <li><Link legacyBehavior href="/user/register"><a>登録</a></Link></li>
                    <li><Link legacyBehavior href="/user/login"><a>ログイン</a></Link></li>
                    <li><Link legacyBehavior  href="/item/create"><a>アイテム作成</a></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header