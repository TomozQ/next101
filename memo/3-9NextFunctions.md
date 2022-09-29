# Next.jsの機能
<br>
<br>

## リンク
___
### Linkコンポーネント
* アプリ内の他のページへ遷移するために使用
* Linkコンポーネントを使用してページを遷移した場合は、通常のページ遷移のように遷移先のページのHTMLファイルなどを取得して描画するのではなく、クライアントサイドで新しいページを描画する。
* 新しいページを描画するために必要なデータはあらかじめ非同期に取得されている。
* 高速なページ遷移が可能
* クエリパラメータも指定する場合、hrefの文字列でそのまま指定する以外にオブジェクトを使っても指定できる。
* a要素の代わりにbuttonなどを使用すると、Linkの子コンポーネントからonClickコールバックが渡され、コールバックが呼ばれるとページが遷移する。
<br>
<br>

### useRouter

```javascript
import { useRouter } from 'next/router'

const router = useRouter()

// 呼ぶとページがリロードされる。
router.reload()

// 呼ぶと前のページに戻る
router.back()

// 遷移開始時のイベントを購読する
router.events.on('routeChangeStart', (url, { shallow }) => {
  // url には遷移先のパスが与えられる
  // shallowはシャロールーティング（パスのみが置き換わる遷移）の場合はtrueになる。
})

// 遷移完了時のイベントを購読する
router.events.on('routeChangeComplete', (url, { shwllow }) => {
  // url には遷移先のパスが与えられる
  // shallowはシャロールーティング（パスのみが置き換わる遷移）の場合はtrueになる。
})
```