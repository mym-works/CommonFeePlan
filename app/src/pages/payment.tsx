import { useState } from "react"
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Price from '../components/price'
import utilStyles from '../styles/utils.module.css'

const pageName = 'Pay the <br />common fee'
const pageDescription = 'Thank you for your cooperation this month 😀'
const pageHero = '/images/payment.jpg'

export default function Home() {
  const [processing, setProcessing] = useState(false)
  const [price, setPrice] = useState(1234567890)
  const [month, setMonth] = useState([{
    date: '',
    id: -1
  }]) 
  const [members, setMembers] = useState([{
    id: -1,
    name: '-'
  }, {
    id: 1,
    name: 'MYM'
  }, {
    id: 2,
    name: 'Yuya Sakai From Miyagi Prefecture'
  }]) 

  const router = useRouter()

  const addMonth = (e) => {
    setMonth([
      ...month,
      {
        date: '',
        id: -1
      }
    ])
  }

  const submit = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      router.push('thanks')
    }, 2000)
  }

  return (
    <Layout pageName={pageName} pageDescription={pageDescription} pageHero={pageHero}>
      <div className="mb-10">
        <Price price={400} />
      </div>
      <div className="mb-10">
        <ul>
          {
            month.map((item, key) => {
              return <li key={key} className="mb-5 flex space-x-5">
                <input className={utilStyles.input} type="date" defaultValue={item.date} />
                <select className={utilStyles.input} defaultValue={item.id}>
                  {
                    members.map((member, key) => {
                      return <option key={key} value={member.id}>{member.name}</option>
                    })
                  }
                </select>
              </li>
            })
          }
        </ul>
        <button className={utilStyles['btn-add']} onClick={addMonth}>Add month</button>
      </div>
      {
        !processing
          ? <button className={utilStyles['btn-submit']} onClick={submit}>Pay</button>
          : <button className={utilStyles['btn-submit']} onClick={submit}>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>Processing
            </button>
      }
    </Layout>
  )
}
