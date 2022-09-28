// 型のために導入
import { NextPage } from "next";
// Next.jsの組み込みのコンポーネント
import Head from "next/head";

// ページコンポーネントのpropsの型定義(ここでは空)
type SSGProps = {}

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
const SSG: NextPage<SSGProps> = () => {   // NextPage<SSGProps>でpropsが入るPageであることを明示
  return (
    <div>
      {/* Headコンポーネントで包むと、その要素は<head>タグに配置される。 */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
      </main>
    </div>
  )
}

// ページコンポーネントは export default でエクスポートする
export default SSG