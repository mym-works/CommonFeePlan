import { useRouter } from "next/router";
import Layout from '../components/layout'
import utilStyles from "../styles/utils.module.css";

const pageName = 'Thank you !!'

export default function Home() {
  const router = useRouter();
  const back = () => {
    router.push('purchase');
  }
  return (
    <div className="mt-10 text-center">
      <Layout pageName={pageName}>
        <img className="-mt-10 mx-auto w-4/5" src="/images/thanks-anim.gif" />
        <p className="mb-14 leading-none text-sm text-gray">The transmission is complete ! 👍<br />thank you for your cooperation !<br /><br />May your day be a wonderful day ! 🌞</p>
        <button className={utilStyles["btn-submit"]} onClick={back}>
          Return Purchase
        </button>
      </Layout>
    </div>
  )
}
