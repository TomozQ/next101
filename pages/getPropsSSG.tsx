import { GetStaticProps, NextPage, NextPageContext } from "next";
import Head from "next/head";

// ページコンポーネントのpropsの型定義
type SSGProps = {
  message: string
}

// SSGはgetStaticPropsが返したpropsを受け取ることができる
const GetPropsSSG: NextPage<SSGProps> = (props) => {  // NextPage<SSGProps>は「message: stringのみを受けとってページ生成されるページ」の型
  const { message } = props

  return (
    <div>
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
        <p>{ message }</p>
      </main>
    </div>
  )
}

// getStaticPropsはビルド時に実行される
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {  // GetStaticProps<SSGProps>は<SSGProps>を引数に取るgetStaticPropsの型
  const timestamp = new Date()
  const message = `${timestamp} にgetStaticPropsが実行されました`
  console.log(message)  // ビルド時にコンソール出力される
  return {
    // ここで返したpropsを元にページコンポーネントを描画する
    props: {
      message,
    },
  }
}

export default GetPropsSSG