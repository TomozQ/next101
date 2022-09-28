// 型を利用するためにインポート
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type PostProps = {
   id: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

const Post: NextPage<PostProps> = (props) => {
  const { id } = props
  const router = useRouter()

  if(router.isFallback){
    // フォールバック向けの表示を返す
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に作成されたページです。</p>
        <p>{`/posts/${id}に対応するページです`}</p>
      </main>
    </div>
  )
}

// getStaticPathsは生成したいページのパスパラメータの組み合わせを返す
// このファイルはpages/posts/[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // それぞれのページのパスパラメータをまとめたもの
  const paths = [
    {
      params: {
        id: '1',
      }
    },
    {
      params: {
        id: '2',
      }
    },
    {
      params: {
        id: '3',
      }
    },
  ]

  // fallbackをfalseにすると、pathsで定義されたページ以外は404ページを表示する
  return { paths, fallback: false }
}

// getStaticPaths実行時にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  // context.paramsにパスパラメータが入っている
  /*
    本はこの形になっているがTSLintのエラーが出てbuildできない。
    context.params['id']は string | string[] 型なので値が配列かどうかで場合分けする
    const id = Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  */

  const { id } = context.params as Params

  return {
    props: {
      id,
    },
  }
}


export default Post