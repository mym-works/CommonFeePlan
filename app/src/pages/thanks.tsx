import Layout from '../components/layout'

const pageName = 'Thank you !!'

export default function Home() {
  return (
    <div className="mt-10 text-center">
      <Layout pageName={pageName}>
        <img className="-mt-10 mx-auto w-4/5" src="/images/thanks-anim.gif" />
        <p className="mb-10 leading-none text-sm text-gray">The transmission is complete ! 👍<br />thank you for your cooperation !<br /><br />May your day be a wonderful day ! 🌞</p>
      </Layout>
    </div>
  )
}
