import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Thank you !!</title>
      </Head>

      <main className={utilStyles.main}>
        <h1 className={utilStyles['center-title']}>Thank you !!</h1>
        <p className={utilStyles['center-description']}>The transmission is complete ! 👍<br />thank you for your cooperation !<br /><br />May your day be a wonderful day ! 🌞</p>
      </main>
    </div>
  )
}
