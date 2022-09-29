import Link from "next/link";
import { useRouter } from "next/router";

const Links = () => {
  const router = useRouter()
  const onClick = () => {
    router.push({
      pathname: '/ssg',
      query: { keyword: 'hello' },
    })
  }

  return (
    <>
      <Link href="/ssr">
        <a>GO TO SSR</a>
      </Link>

      <br />
      
      {/* hrefに文字列を指定する代わりにオブジェクトを指定できる */}
      <Link
        href={{
          pathname: '/ssg',
          query: { keyword: 'hello' },
        }}
      >
        <a>GO TO SSG</a>
      </Link>

      <br />
      {/* aの代わりにbuttonを使うと,onClickが呼ばれたタイミングで遷移する */}
      <Link href="/ssg">
        <button>Jump to SSG page</button>
      </Link>
      
      <br />
      <button onClick={ onClick }>
        Router to SSG
      </button>
    </>
  )
}

export default Links