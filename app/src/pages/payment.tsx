import { useRouter } from 'next/router'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const router = useRouter()

  const submit = (e) => {
    e.preventDefault()
    router.push('thanks')
  }

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Pay the common fee</title>
      </Head>

      <main className={utilStyles.main}>
        <h1 className={utilStyles.title}>Pay the<br /> common fee</h1>
        <p className={utilStyles.description}>Thank you for your cooperation this month 😀</p>
        <button className={utilStyles.submit} onClick={submit}>Pay</button>
      </main>
    </div>
  )
}
