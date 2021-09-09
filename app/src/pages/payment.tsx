import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Price from "../components/price";
import utilStyles from "../styles/utils.module.css";
import {
  getMembersWithSWR,
  postPaymentMonth,
  getMemberHistory,
} from "../lib/api";

const pageName = "Pay the <br />common fee";
const pageDescription = "Thank you for your cooperation this month 😀";
const pageHero = "/images/payment.jpg";

export default function Home() {
  // const [processing, setProcessing] = useState(false);
  // const [price, setPrice] = useState(1234567890);
  // const [month, setMonth] = useState([
  //   {
  //     date: "",
  //     id: -1,
  //   },
  // ]);
  const [months, setMonths] = useState([]);
  const [memberId, setMemberId] = useState('');

  const members = getMembersWithSWR();

  const router = useRouter();

  // const addMonth = (e) => {
  //   setMonth([
  //     ...month,
  //     {
  //       date: "",
  //       id: -1,
  //     },
  //   ]);
  // };

  const selectMember = async (id) => {
    setMemberId(id)

    if (!id) return;

    const history = await getMemberHistory(id);
    console.log(history);

    let originMonths = [];
    for (let i = 0; i < 6; i++) {
      const date = dayjs().add(-i, "month");

      const liabilityMonth = `${date.year()}/${date.format("MM")}/01 00:00:00`

      const paidMonth = history.find(
        (value) =>
          value.liabilityMonth === liabilityMonth
      );

      originMonths.push({
        liabilityMonth: liabilityMonth,
        year: date.year(),
        month: date.format("MMM"),
        processing: false,
        paid: !!paidMonth,
        price: paidMonth ? paidMonth.price : 500,
      });
    }
    originMonths.reverse();
    setMonths(originMonths);
  };

  const submit = async (index) => {
    const month = months[index]
    if (!window.confirm('Are you sure to pay CommonFee?\n' + month.month + '. ' + month.year)) return
    months[index].processing = true;
    setMonths(Object.assign([], months));

    await postPaymentMonth(memberId, month.liabilityMonth, month.price)

    months[index].processing = false;
    months[index].paid = true;
    setMonths(Object.assign([], months));
    // e.preventDefault();
    // setProcessing(true);
    // await postPaymentMonth(month)
    // router.push("thanks");
    window.alert('Thank you for your payment!\nWe hope to continue good living.')
  };

  const setMonthPrice = (index, value) => {
    months[index].price = value;
    setMonths(Object.assign([], months));
  };

  return (
    <Layout
      pageName={pageName}
      pageDescription={pageDescription}
      pageHero={pageHero}
    >
      <div className="mb-14">
        {/* <Price price={400} /> */}
        <h2 className="mb-8 text-sm leading-none font-bold">What's your name?</h2>
        <select
          value={memberId}
          onChange={(e) => selectMember(e.target.value)}
          className={utilStyles.input}
        >
          <option value="">Select tenant name</option>
          {members.map((member, key) => {
            return (
              <option key={key} value={member.id}>
                {member.name}
              </option>
            );
          })}
        </select>
      </div>

      {
        memberId && (
          <div className="mb-14">
            <ul>
              {months.map((month, index) => {
                return (
                  <li key={index} className="mb-5 flex space-x-5">
                    <span
                      style={{
                        width: "300px",
                        marginTop: "5px",
                        display: "inline-block",
                      }}
                    >
                      {month.month}. {month.year}
                    </span>
                    <select
                      className={utilStyles.input}
                      onChange={(e) => setMonthPrice(index, e.target.value)}
                      value={month.price}
                      disabled={month.paid}
                    >
                      <option value="100">¥100</option>
                      <option value="200">¥200</option>
                      <option value="300">¥300</option>
                      <option value="400">¥400</option>
                      <option value="500">¥500</option>
                      <option value="600">¥600</option>
                      <option value="700">¥700</option>
                      <option value="800">¥800</option>
                      <option value="900">¥900</option>
                      <option value="1000">¥1,000</option>
                    </select>
                    {/* <input
                  className={utilStyles.input}
                  type="date"
                  // defaultValue={item.date}
                /> */}
                    {!month.processing ? (
                      <button
                        className={utilStyles["btn-submit"]}
                        onClick={(e) => submit(index)}
                        style={{ padding: 0 }}
                        disabled={month.paid}
                      >
                        {month.paid ? 'Paid' : 'Pay'}
                      </button>
                    ) : (
                      <button
                        className={utilStyles["btn-submit"]}
                        style={{ padding: 0 }}
                      >
                        <svg
                          className="animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* <button className={utilStyles["btn-add"]} onClick={addMonth}>
          Add month
        </button> */}
          </div>
        )
      }
    </Layout>
  );
}
