# Next.jsのページとデータ取得

Next.jsでは実装する関数やその関数の返す値によって、pagesのレンダリング手法が切り替わる。

__レンダリング手法を決定する主な要素はデータ取得の関数__

|  種別  |  データ取得に使う主な関数  | データ取得タイミング | 補足 |
| ---- | ---- | ---- | ---- |
|  SSG  |  getStaticProps  |  ビルド時（SSG）  |  データ取得を一切行わない場合もSSG相当  |
|  SSR  |  getServerSideProps  |  ユーザーのリクエスト時（サーバーサイド）  |  getInitialPropsを使ってもSSR  |
|  ISR  |  revalidateを返すgetStaticProps  |  ビルド時（ISR）  |  ISRはデプロイ後もバックグラウンドビルドが実行される  |
|  CSR  |  上記以外の任意の関数（useSWRなど）  |  ユーザーのリクエスト時（ブラウザ）  |  CSRはSSG / SSR / ISRと同時に利用可能  |

<br>
pagesはその種別によってデータ取得に使える関数が異なるとも言える。<br>
ページコンポーネントで全ての表示部分を実装する必要はない。ページ間で共通に使用するコードやUIパーツはpagesディレクトリ外に定義し、インポートして使用できる。
<br>
<br>

```
SSGについて

$npm run dev

を使って開発サーバーを立ち上げている場合は最新のコードを使ってページを表示するため、リクエストがあるたびにgetStaticPropsが実行されてサーバーでページを生成する。
```
<br>
<br>

## getStaticProps
___

getStaticPropsはエクスポートする必要があり、非同期関数としてasyncとともに定義する必要がある。<br>
getStaticPropsの引数にはcontextが与えられる（ReactのContextとは別物）。contextにはビルド時に使用できるデータが含まれる。

```javascript
export async function getStaticProps(context) {
  return {
    props: {}
  }
}
```

|  パラメータ  |  内容  |
| ---- | ---- |
|  params  |  パスパラメータ。SSGの場合はgetStaticPaths関数を別途定義したときに参照可能。  |
|  locale  |  現在のロケール情報（可能な場合）  |
|  locales  |  サポートしているロケールの配列（可能な場合）  |
|  defaultLocale  |  デフォルトのロケールのデータ（可能な場合）  |
|  preview  |  Preview Modeかどうか  |
|  previewData  |  Preview ModeでsetPreviewDataによってセットされたデータ  |

<br>
<br>

## getStaticPaths
___

### Dynamic Routing
パスパラメータを使って複数ページを一つのファイルで生成できる。動的ルーティングは下記２要素から成り立つ

1. [パラメータ].tsxのような[]で囲んだ特別なファイル名
2. getStaticPropsとあわせてgetStaticPathsを利用する。

<br>

`getStaticPaths`は`getStaticProps`実行前に呼ばれる関数で、生成したいページのパスパラメータの組み合わせ(__paths__)とフォールバック(__fallback__)を返す。<br>
* pathsはパスパラメータの組み合わせを表し、配列の要素１つが１つのページに対応する。
* fallbackはgetStaticPathsが生成するページが存在しない場合の処理を記載する。

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... }}
    ],
    fallback: false // trueもしくは'blocking'を指定可能
  }
}
```