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
        <title>Purchase</title>
      </Head>

      <main className={utilStyles.main}>
        <h1 className={utilStyles.title}>Purchase</h1>
        <p className={utilStyles.description}>Hello! Thank you for shopping 😀 Fill out this form and then take the money from the common fee</p>
        <h2 className={utilStyles.subtitle}>What's items</h2>
        <button className={utilStyles.submit} onClick={submit}>Purchase</button>
      </main>
    </div>
  )
}
