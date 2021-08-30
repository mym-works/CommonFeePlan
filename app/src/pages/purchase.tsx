import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Price from "../components/price";
import Item from "../components/item";
import utilStyles from "../styles/utils.module.css";
import { getMembersWithSWR, postPurchaseItems } from "../lib/api";

const pageName = "Purchase";
const pageDescription =
  "Hello! Thank you for shopping 😀 Fill out this form and then take the money from the common fee";

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [memberId, setMemberId] = useState("");
  // const [members, setMembers] = useState([]);

  const members = getMembersWithSWR();

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await postPurchaseItems(memberId, items);
    router.push("thanks");
  };

  const updateItems = (childItems) => {
    setItems(childItems);
    setPrice(
      childItems.reduce((sum, element) => {
        return sum + (element.price || 0) * element.quantity;
      }, 0)
    );
  };

  return (
    <Layout pageName={pageName} pageDescription={pageDescription}>
      <div className="mb-14">
        <h2 className="mb-8 text-sm leading-none font-bold">What's your name?</h2>
        <select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className={utilStyles.input}
        >
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
            <h2 className="mb-8 text-sm leading-none font-bold">What's items</h2>

            <div className="mb-14">
              <Item items={items} update={updateItems} />
            </div>

            <div className="mb-10">
              <Price price={price} />
            </div>

            {!processing ? (
              <button className={utilStyles["btn-submit"]} onClick={submit} disabled={!items.length}>
                Purchase
              </button>
            ) : (
              <button className={utilStyles["btn-submit"]}>
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
          </div>
        )
      }
    </Layout>
  );
}
