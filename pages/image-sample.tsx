import { NextPage } from 'next'
import Image from 'next/image'
// 画像ファイルをインポート
import BibleImage from '../public/images/07.jpg'

const ImageSample: NextPage<void> = (props) => {
  return (
    <div>
      <h1>画像表示の比較</h1>
      <p>imgタグで表示した場合</p>
      <img src='/images/07.jpg' />
      <p>Imageコンポーネントを使用した場合</p>
      {/* パスを指定する代わりにインポートした画像を指定 */}
      <Image src={ BibleImage } />
      <p>Imageで表示した場合は事前に描画エリアが確保される。</p>
    </div>
  )
}

export default ImageSample