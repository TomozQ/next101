# Next.jsのレンダリング手法
Next.jsではページごとにレンダリング手法を切り替えることができる。

1. 静的サイト生成（SSG: Static Site Generation）
2. クライアントサイドレンダリング(CSR: Client Side Rendering)
3. サーバーサイドレンダリング(SSR: Server Side Rendering)
4. インクリメンタル静的再生成(ISR: Incremental Static Regeneration)

全てのページで、事前レンダリング可能な部分は事前レンダリングを行う。
<br>
<br>

## 静的サイト生成（SSG）
___
SSGではビルド時にAPIなどからデータを取得して、ページを描画して静的ファイルとして生成する。

* ビルド時にgetStaticPropsという関数が呼ばれ、損保関数の中でAPIコールなどを行い、ページの描画に必要なpropsを返す
* このpropsをページコンポーネントに渡して描画
* 描画結果は静的ファイルの形でビルド結果に保存される。
* ブラウザはそれをもとに描画し、初期描画後は普通のReactアプリケーション同様に、APIなどからデータを取得して描画を動的に変化できる。

```mermaid
flowchart TD
  APIサーバ --> |APIリクエスト|getStaticProps
  getStaticProps --> APIサーバ
  subgraph `
  getStaticProps --> |props|render
  render --> |生成した静的ファイル|ビルド結果
  end
```
<br>
<br>

```mermaid
flowchart TD
  subgraph サーバーサイド
    APIサーバ
    APIルート
    静的コンテンツ
  end
  subgraph クライアントサイド
    Reactアプリケーション
  end
  APIサーバ --> |APIリクエスト| Reactアプリケーション
  APIルート --> |APIリクエスト| Reactアプリケーション
  静的コンテンツ --> |ビルド時に生成した静的ファイル| Reactアプリケーション
  Reactアプリケーション --> APIサーバ
  Reactアプリケーション --> APIルート
```
<br>
<br>
SSGはアクセス時は静的ファイルをクライアントに渡すだけなので初期描画が高速。一方でビルド時のみデータ取得を行うため、初期描画で古いデータが表示される可能性がある。リアルタイム性が求められるようなコンテンツにはあまり適さない。
<br>
ビルド後に表示内容が変更されないページ、または初期描画以降にデータを表示できるようなページに対してSSGが優れている。パフォーマンスに優れるため、

`Next.jsにおいてはSSRよりSSGが推奨される `
<br>
<br>

## クライアントサイドレンダリング（CSR）
___
* ビルド時にデータ取得を行わず、ページを描画して保存する。
* ブラウザで初期描画した後に非同期でデータを取得して、追加のデータを描画
* ページを描画するのに必要なデータは後から取得して反映するため、SEOにあまり有効ではない

__CSRはSSg, SSR, ISRと組み合わせて利用される。CSRのみの利用はなく、基本的にはSSG, SSR, ISRと組み合わせるものと考える__

* 初期描画がそこまで重要ではなく、リアルタイム性が重要なページに適している。
<br>
<br>

## サーバーサイドレンダリング(SSR)
___
* ページのアクセスがある度サーバーで`getServerProps`を呼び出し、その結果のpropsをもとにページをサーバー側で描画してクライアントへ渡す。

```mermaid
flowchart RL
  subgraph サーバーサイド
    APIサーバ
    APIルート
    render
    getServerSideProps
  end
  subgraph クライアントサイド
    Reactアプリケーション
  end

  APIサーバ --> |APIリクエスト| getServerSideProps
  getServerSideProps --> APIサーバ
  getServerSideProps --> |props| render
  render --> |アクセス時に生成した静的ファイル| Reactアプリケーション
  APIルート --> |APIリクエスト| Reactアプリケーション
  Reactアプリケーション --> APIルート
  APIサーバ --> |APIリクエスト| Reactアプリケーション
  Reactアプリケーション --> APIサーバ
```
<br>
<br>
アクセスごとにサーバーでデータを取得して描画するため、常に最新のデータを元にしてページの初期描画ができ、SEOへの有用性が期待できる。しかし、サーバーでの一定の処理があるため、他の手法に比べると低レイテンシに陥る可能性がある。<br>
最新価格が表示される製品ページなど、常に最新のデータを表示させたい場合にSSRが適している。
<br>
<br>

## インクリメンタル静的再生成（ISR）
___
* SSGの応用ともいうべきレンダリング手法
* 事前にページを生成して配信しつつ、アクセスに応じてページをサイド生成して新しいページを配信できる。
* ページへアクセスがあると、事前にレンダリングしてある、サーバに保存されているページのデータをクライアントへ渡す。このデータに有効期限を設定でき、有効期限が切れた状態でアクセスがあった場合は、バックグラウンドで再度`getStaticProps`の実行とページ描画をし、サーバーに保存されているページデータを更新する。

```mermaid
flowchart RL
  subgraph サーバーサイド
    getStaticProps
    render
    キャッシュ
    APIサーバ
  end
  subgraph クライアントサイド
    Reactアプリケーション
  end

  APIサーバ --> |APIリクエスト| getStaticProps
  getStaticProps --> APIサーバ
  getStaticProps --> |props| render
  render --> キャッシュ
  キャッシュ --> |一定間隔ごとに生成した静的ファイル| Reactアプリケーション
  APIサーバ --> |APIリクエスト| Reactアプリケーション
  Reactアプリケーション --> APIサーバ
```
<br>
SSRと違ってリクエスト時にサーバ側での処理がないため、SSG同様にレイテンシを高く保つことができ、かつある程度最新のデータを元にしたページを再描画で表示できる。<br>
SSGとSSRの中間のようなレンダリング手法