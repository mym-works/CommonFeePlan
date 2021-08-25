import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Index</title>
      </Head>

      <main className={utilStyles.main}>
        <h1 className={utilStyles.title}>Index</h1>
        <p><Link href="/payment">/payment</Link></p>
        <p><Link href="/purchase">/purchase</Link></p>
        <p><Link href="/thanks">/thanks</Link></p>
      </main>
    </div>
  )
}
